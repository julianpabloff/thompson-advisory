// How far down the page is the element?
function getAbsoluteOffsetTop(element) {
	let offset = 0;
	do {
		offset += element.offsetTop;
		element = element.offsetParent;
	} while (element);
	return offset;
}

// T Values
const getTValue = (start, point, end) => (point - start) / (end - start);
function getBoundedTValue(start, point, end) {
	const t = getTValue(start, point, end);
	if (t < 0) return 0;
	if (t > 1) return 1;
	return t;
};

class ScrollTracker {
	constructor(element, inPadding = 0, outPadding = 0) {
		this.element = element;
		this.inPadding = inPadding;
		this.outPadding = outPadding;

		this.changed = true;
		this.onResize();
	}

	onScroll(scrollY = window.scrollY) {
		const previousT = this.t;
		this.t = getBoundedTValue(this.start + this.inPadding, scrollY, this.end - this.outPadding);
		this.changed = this.t != previousT;
	}

	onResize() {
		const y = getAbsoluteOffsetTop(this.element);
		const windowHeight = window.innerHeight;

		this.start = (y - windowHeight) * (y > windowHeight);
		this.end = y + this.element.clientHeight;

		this.onScroll();
	}
}
