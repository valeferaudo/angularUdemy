export class Usuario{
    constructor(
        public nombre : string,
        public email : string,
        public password?: string,
        public imagen?: string,
        public google?: boolean, 
        public role?: string,
        public uid?: string,
        ){
        
        }

}