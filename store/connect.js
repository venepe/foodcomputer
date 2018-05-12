export function getCurrentTemp(store) {
	return store.getState().currentTemp;
}

export function isFanOn(store) {
	return store.getState().isFanOn;
}
