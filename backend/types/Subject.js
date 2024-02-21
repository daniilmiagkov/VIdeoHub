export class Subject {
    constructor(title) {
        Object.defineProperty(this, "Title", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "Labs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "Tasks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "Visits", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.Title = title;
    }
}
export class SubjectElement {
    constructor() {
        Object.defineProperty(this, "Title", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "FileName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "Path", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        // Tasks: Array<Task> ;
        Object.defineProperty(this, "Date", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "Subject", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "Number", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
}
export class Visit extends SubjectElement {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "Type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "await"
        });
        Object.defineProperty(this, "Types", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "skipped",
                "await",
                "disease",
                "cancelled",
                "visited",
            ]
        });
    }
}
export class Lab extends SubjectElement {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "FileMethod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "FileLab", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "Type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "not done"
        });
        Object.defineProperty(this, "Types", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                "overdue",
                "not done",
                "process",
                "done",
                "accepted",
            ]
        });
        Object.defineProperty(this, "Score", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "MaxScore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
}
export class Task {
    constructor(title, done) {
        Object.defineProperty(this, "Title", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "Done", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.Title = title;
        this.Done = done;
    }
}
