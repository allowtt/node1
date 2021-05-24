console.log(this);
function a() {
    console.log(this === globalThis);
}
a();