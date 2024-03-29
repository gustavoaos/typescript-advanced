export function sealed(name: string) {
	return (target: Function): void => {
		console.log(`Sealing the constructor: ${name}`);
		Object.seal(target);
		Object.seal(target.prototype);
	};
}

export function logger<TFunction extends Function>(target: TFunction): TFunction {
	const newConstructor: Function = function() {
		console.log(`Creating new instance.`);
		console.log(target);
	};

	newConstructor.prototype = Object.create(target.prototype);
	newConstructor.prototype.constructor = target;

	return newConstructor as TFunction;
}

export function writable(isWritable: boolean) {
	return (target: Object, propertyKey: string, descriptor: PropertyDescriptor): void => {
		console.log(`Setting ${propertyKey}.`);
		descriptor.writable = isWritable;
	};
}
