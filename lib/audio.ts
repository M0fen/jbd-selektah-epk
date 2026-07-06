/**
 * Audio-reactive singleton. A short track preview is analysed with the Web Audio
 * API and its frequency bands are exposed as plain fields so the R3F render loop
 * can read them every frame without triggering React re-renders.
 *
 * Starts silent (browser autoplay policy). If no track is available at `src`,
 * toggle() fails gracefully and the field decays to rest — the background just idles.
 */
class AudioReactive {
    private ctx: AudioContext | null = null;
    private analyser: AnalyserNode | null = null;
    private data: Uint8Array<ArrayBuffer> | null = null;
    private el: HTMLAudioElement | null = null;

    active = false;
    bass = 0;
    mid = 0;
    treble = 0;
    level = 0;

    private async ensure(src: string) {
        if (this.ctx) return;
        this.ctx = new AudioContext();
        this.el = new Audio(src);
        this.el.loop = true;
        this.el.crossOrigin = "anonymous";
        const source = this.ctx.createMediaElementSource(this.el);
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 128;
        this.analyser.smoothingTimeConstant = 0.8;
        source.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
        this.data = new Uint8Array(new ArrayBuffer(this.analyser.frequencyBinCount));
    }

    /** Toggle playback; returns the resulting active state. */
    async toggle(src: string): Promise<boolean> {
        try {
            await this.ensure(src);
            if (!this.ctx || !this.el) return false;
            if (this.active) {
                this.el.pause();
                this.active = false;
            } else {
                await this.ctx.resume();
                await this.el.play();
                this.active = true;
            }
        } catch {
            // Missing track or blocked playback — stay silent, idle background.
            this.active = false;
        }
        return this.active;
    }

    /** Call once per frame from the render loop. */
    update() {
        if (this.active && this.analyser && this.data) {
            this.analyser.getByteFrequencyData(this.data);
            const n = this.data.length;
            const band = (a: number, b: number) => {
                let s = 0;
                for (let i = a; i < b; i++) s += this.data![i];
                return s / (b - a) / 255;
            };
            this.bass = band(0, Math.max(1, Math.floor(n * 0.12)));
            this.mid = band(Math.floor(n * 0.12), Math.floor(n * 0.5));
            this.treble = band(Math.floor(n * 0.5), n);
            this.level = (this.bass + this.mid + this.treble) / 3;
        } else {
            // Decay smoothly to rest.
            this.bass *= 0.92;
            this.mid *= 0.92;
            this.treble *= 0.92;
            this.level *= 0.92;
        }
    }
}

export const audioReactive = new AudioReactive();
