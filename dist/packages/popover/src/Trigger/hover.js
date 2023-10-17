import { get } from "svelte/store";
import { Trigger } from ".";
export class HoverTrigger extends Trigger {
    options;
    constructor(elements, events, options) {
        super(elements, events);
        this.options = options;
        this.setHandlers({
            target: {
                mouseenter: () => {
                    this.openWithDelay();
                },
                mouseleave: (e) => {
                    {
                        if (e.relatedTarget) {
                            if (!get(this.elements.content)?.contains(e.relatedTarget)) {
                                this.closeWithDelay();
                            }
                        }
                        else {
                            this.closeWithDelay();
                        }
                    }
                }
            },
            content: {
                mouseenter: () => {
                    this.openWithDelay();
                },
                mouseleave: (e) => {
                    {
                        if (e.relatedTarget) {
                            if (!get(this.elements.target)?.contains(e.relatedTarget)) {
                                this.closeWithDelay();
                            }
                        }
                        else {
                            this.closeWithDelay();
                        }
                    }
                }
            }
        });
    }
    openWithDelayTimeout;
    openWithDelay() {
        clearTimeout(this.closeWithDelayTimeout);
        this.openWithDelayTimeout = setTimeout(() => {
            this.open();
        }, this.getDelay().open);
    }
    closeWithDelayTimeout;
    closeWithDelay() {
        clearTimeout(this.openWithDelayTimeout);
        this.closeWithDelayTimeout = setTimeout(() => {
            this.close();
        }, this.getDelay().close);
    }
    getDelay() {
        let delay = this.options?.delay || [100, 200];
        if (typeof delay === 'number') {
            delay = [delay, delay];
        }
        return {
            open: delay[0],
            close: delay[1],
        };
    }
}
