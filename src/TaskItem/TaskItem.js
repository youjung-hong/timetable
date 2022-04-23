"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskItem = void 0;
var nextId = 1;
/**
 * @class
 * @constructor
 * @param {Date} startAt - datetime when user started a task
 * @param {Date} endAt - datetime when user ended a task
 * @param {any} meta - metadata
 * @example
 * // startAt: now, endAt: now
 * const task = new TaskItem();
 * @example
 * // startAt: new Date('2020-04-13T00:00:00'), endAt: new Date('2020-04-13T00:00:00')
 * const task = new TaskItem('2020-04-13T00:00:00');
 * @example
 * // startAt: new Date('2020-04-13T00:00:00'), endAt: new Date('2020-04-15T00:00:00')
 * const task = new TaskItem('2020-04-13T00:00:00', '2020-04-15T00:00:00');
 * @example
 * // startAt: new Date('2020-04-13T00:00:00'), endAt: new Date('2020-04-15T00:00:00')
 * // meta: { id: 1 }
 * const task = new TaskItem('2020-04-13T00:00:00', '2020-04-15T00:00:00', { id: 1 });
 */
var TaskItem = /** @class */ (function () {
    function TaskItem(startAt, endAt, meta) {
        this.id = nextId;
        this._startAt = startAt ? new Date(startAt) : new Date();
        this._endAt = endAt ? new Date(endAt) : this._startAt;
        if (this._startAt > this._endAt) {
            this._endAt = this._startAt;
        }
        this.meta = meta;
        this.calculateDuration();
        nextId += 1;
    }
    Object.defineProperty(TaskItem.prototype, "startAt", {
        get: function () {
            return this._startAt;
        },
        set: function (_startAt) {
            this._startAt = _startAt;
            if (this._startAt > this._endAt) {
                this._endAt = new Date(this._startAt.getTime() + this.duration);
                return;
            }
            this.calculateDuration();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskItem.prototype, "endAt", {
        get: function () {
            return this._endAt;
        },
        set: function (_endAt) {
            if (_endAt < this._startAt) {
                return;
            }
            this._endAt = _endAt;
            this.calculateDuration();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * calculate milliseconds between startAt and endAt and set it to duration
     * @private
     */
    TaskItem.prototype.calculateDuration = function () {
        this.duration = this.endAt.valueOf() - this.startAt.valueOf();
    };
    return TaskItem;
}());
exports.TaskItem = TaskItem;
/**
 * clone a task item
 * @static
 * @param {TaskItem} item - an item to be cloned
 * @returns {TaskItem} a new item having the same data
 * @example
 * const task1 = new TaskItem();
 * const cloneOfTask1 = TaskItem.clone(task1);
 */
TaskItem.clone = function (item) {
    var taskItem = new TaskItem();
    taskItem.id = item.id;
    taskItem.startAt = item.startAt;
    taskItem.endAt = item.endAt;
    taskItem.meta = item.meta;
    return taskItem;
};
