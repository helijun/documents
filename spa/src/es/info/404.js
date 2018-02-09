import common from "../common/common";

class Dog2 extends common {
    constructor() {
        super();//执行一次父类的构造，否则会报错
        console.log("==constructor dog==");
    }
}

var dog2 = new Dog2();
dog2.showToast3();

export default Dog2;