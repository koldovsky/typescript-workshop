import DOMElement from './dom-element';

export default class Task {
    private priority: number;
    private title: string;
    constructor(priority: number, title: string) {
        this.priority = priority;
        this.title = title;
    }

    @DOMElement('li')
    toString(): string {
        return `Priority: ${this.priority}, Title: ${this.title}`;
    }
}

export class HighPriorityTask extends Task {
    @DOMElement('strong')
    toString(): string {
        return super.toString();
    }
}