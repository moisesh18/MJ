export class Student {
    constructor(
        public _id: string = null,
        public first_name: string = "",
        public last_name: string = "",
        public career: string = null,
        public career_year: number = null,
        public birthday: string = "",
        public email: string = "",
        public phone: string = "",
        public shirt_size: string = null,
        public resident: Boolean = false,
        public residence: string = "",
        public breakfast: Boolean = false,
        public lunch: Boolean = false,
        public dinner: Boolean = false,
        public blood_type: string = "",
        public drugs: string = null,
        public allergy: string = null,
        public recent_illness: string = null,
        public cycle: any = '',
        public baptized: boolean = false,
        public religion: string = "",
        public mexican: boolean = true,
        public emergency_phone: string = ""
    ) { }
}