export class Student {

    constructor(){
        this._id = null;
        this.first_name = "";
        this.last_name = "";
        this.career = null;
        this.career_year = null;
        this.birthday = "";
        this.email = "";
        this.phone = "";
        this.shirt_size = null;
        this.resident = false; 
        this.residence = "";
        this.breakfast = false; 
        this.lunch = false; 
        this.dinner = false;
        this.blood_type = "";
        this.drugs = null;
        this.allergy = null;
        this.recent_illness = null;
    }

    _id: String;
    first_name: String;
    last_name: String;
    career: String;
    career_year: Number;
    birthday: String;
    email: String;
    phone: String;
    shirt_size: String;
    resident: Boolean; 
    residence: String;
    breakfast: Boolean; lunch: Boolean; dinner: Boolean;
    blood_type: String;
    drugs:  String;
    allergy:  String;
    recent_illness:  String;
}
