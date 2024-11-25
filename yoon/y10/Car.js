/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Car = function () {

	// car geometry manual parameters

	this.modelScale = 1;
	this.wheelDiameter = 1;

	// car "feel" parameters

	this.MAX_SPEED = 2200;
	this.MAX_REVERSE_SPEED = - 1500;

	this.MAX_WHEEL_ROTATION = 0.6;

	this.FRONT_ACCELERATION = 1250;
	this.BACK_ACCELERATION = 1500;

	this.WHEEL_ANGULAR_ACCELERATION = 1.5;

	this.FRONT_DECCELERATION = 750;
	this.WHEEL_ANGULAR_DECCELERATION = 1.0;

	this.STEERING_RADIUS_RATIO = 0.0023;

	this.MAX_TILT_SIDES = 0.05;
	this.MAX_TILT_FRONTBACK = 0.015;

	// internal control variables

	this.speed = 0;
	this.acceleration = 0;

	this.wheelOrientation = 0;
	this.carOrientation = 0;

	// car rigging

	this.root = new THREE.Object3D();

	this.frontLeftWheelRoot = new THREE.Object3D();
	this.frontRightWheelRoot = new THREE.Object3D();

	this.bodyMesh = null;

	this.frontLeftWheelMesh = null;
	this.frontRightWheelMesh = null;
	this.backLeftWheelMesh = null;
	this.backRightWheelMesh = null;

	this.bodyGeometry = null;
	this.wheelGeometry = null;

	this.bodyMaterials = null;
	this.wheelMaterials = null;

	// internal helper variables

	this.loaded = false;

	this.meshes = [];

	this.updateCarModel = function ( delta, controls ) {

		// speed and wheels based on controls
		if ( controls.moveForward ) {

			this.speed = THREE.Math.clamp( this.speed + delta * this.FRONT_ACCELERATION, this.MAX_REVERSE_SPEED, this.MAX_SPEED );
			this.acceleration = THREE.Math.clamp( this.acceleration + delta, - 1, 1 );

		}

		if ( controls.moveBackward ) {


			this.speed = THREE.Math.clamp( this.speed - delta * this.BACK_ACCELERATION, this.MAX_REVERSE_SPEED, this.MAX_SPEED );
			this.acceleration = THREE.Math.clamp( this.acceleration - delta, - 1, 1 );

		}

		if ( controls.moveLeft ) {

			this.wheelOrientation = THREE.Math.clamp( this.wheelOrientation + delta * this.WHEEL_ANGULAR_ACCELERATION, - this.MAX_WHEEL_ROTATION, this.MAX_WHEEL_ROTATION );

		}

		if ( controls.moveRight ) {

			this.wheelOrientation = THREE.Math.clamp( this.wheelOrientation - delta * this.WHEEL_ANGULAR_ACCELERATION, - this.MAX_WHEEL_ROTATION, this.MAX_WHEEL_ROTATION );

		}

		// speed decay

		if ( ! ( controls.moveForward || controls.moveBackward ) ) {

			if ( this.speed > 0 ) {

				var k = exponentialEaseOut( this.speed / this.MAX_SPEED );

				this.speed = THREE.Math.clamp( this.speed - k * delta * this.FRONT_DECCELERATION, 0, this.MAX_SPEED );
				this.acceleration = THREE.Math.clamp( this.acceleration - k * delta, 0, 1 );

			} else {

				var k = exponentialEaseOut( this.speed / this.MAX_REVERSE_SPEED );

				this.speed = THREE.Math.clamp( this.speed + k * delta * this.BACK_ACCELERATION, this.MAX_REVERSE_SPEED, 0 );
				this.acceleration = THREE.Math.clamp( this.acceleration + k * delta, - 1, 0 );

			}


		}

		// steering decay

		if ( ! ( controls.moveLeft || controls.moveRight ) ) {

			if ( this.wheelOrientation > 0 ) {

				this.wheelOrientation = THREE.Math.clamp( this.wheelOrientation - delta * this.WHEEL_ANGULAR_DECCELERATION, 0, this.MAX_WHEEL_ROTATION );

			} else {

				this.wheelOrientation = THREE.Math.clamp( this.wheelOrientation + delta * this.WHEEL_ANGULAR_DECCELERATION, - this.MAX_WHEEL_ROTATION, 0 );

			}

		}

		// car update

		var forwardDelta = this.speed * delta;

		this.carOrientation += ( forwardDelta * this.STEERING_RADIUS_RATIO ) * this.wheelOrientation;

		// displacement

		this.root.position.x += Math.sin( this.carOrientation ) * forwardDelta;
		this.root.position.z += Math.cos( this.carOrientation ) * forwardDelta;

		// steering

		this.root.rotation.y = this.carOrientation;

		// tilt

		if ( this.loaded ) {

			this.bodyMesh.rotation.z = this.MAX_TILT_SIDES * this.wheelOrientation * ( this.speed / this.MAX_SPEED );
			this.bodyMesh.rotation.x = - this.MAX_TILT_FRONTBACK * this.acceleration;

		}

		// wheels rolling

		var angularSpeedRatio = 1 / ( this.modelScale * ( this.wheelDiameter / 2 ) );

		var wheelDelta = forwardDelta * angularSpeedRatio;

		if ( this.loaded ) {

			this.frontLeftWheelMesh.rotation.x += wheelDelta;
			this.frontRightWheelMesh.rotation.x += wheelDelta;
			this.backLeftWheelMesh.rotation.x += wheelDelta;
			this.backRightWheelMesh.rotation.x += wheelDelta;

		}

		// front wheels steering

		this.frontLeftWheelRoot.rotation.y = this.wheelOrientation;
		this.frontRightWheelRoot.rotation.y = this.wheelOrientation;

	};

	// internal helper methods

	function quadraticEaseOut( k ) {

		return - k * ( k - 2 );

	}
	function cubicEaseOut( k ) {

		return -- k * k * k + 1;

	}
	function circularEaseOut( k ) {

		return Math.sqrt( 1 - -- k * k );

	}
	function sinusoidalEaseOut( k ) {

		return Math.sin( k * Math.PI / 2 );

	}
	function exponentialEaseOut( k ) {
		return k === 1 ? 1 : - Math.pow( 2, - 10 * k ) + 1;
	}

};