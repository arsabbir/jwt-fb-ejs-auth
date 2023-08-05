import bcrypt from "bcryptjs";
// password hassing
class Hash{
    static makeHash(data){
        const salt =bcrypt.genSaltSync(10);
        return  bcrypt.hashSync(data,salt);
    }
    // password compare
    static hashMatch(data,hashing){
      return  bcrypt.compareSync(data,hashing)
    }
}


//export

export default Hash