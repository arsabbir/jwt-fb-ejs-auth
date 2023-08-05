// Validatioin Check
class Validation {
//email check
static emailCheck(email) {
    return email.match(/^[a-z0-9\.]{1,}@[a-z]{1,10}\.[a-z]{1,5}$/);
}

//Phone Number check
static phoneCheck(phone) {
    return phone.match(/^[\+0-9]{1,15}$/);
}
}

// export Validation
export default Validation