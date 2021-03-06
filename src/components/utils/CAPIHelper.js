let instance = null;

class CAPIHelper {
  // Using Singleton
  constructor() {
    if (!instance) {
      // Make sure is only one instance.
      instance = this;
    }

    this._type = "default";
    return instance;
  }

  debugValue(value) {
    console.log("CAPIHelper", value);
  }

  static googleSheetURL() {
    if (instance._type === "default") {
      return "https://script.google.com/macros/s/AKfycbyWx63L82e2DqT50ILpYL6rpGXakBaRteP-gzqdg-tnI1-xTEs/exec";
    } else {
      //e.g. this._type == "testing";
      return "https://script.google.com/macros/s/testing/exec";
    }
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }
}

export default CAPIHelper;
