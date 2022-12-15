import Cars from "../../api/Models/cars/carsModel";

class APIFeatures{
    public query : String;
    public queryString : String;
    constructor(
        query: String,
        queryString: String
    ){
        this.query = query;
        this.queryString = queryString
    };

    filter(find: String){
        const queryObj = {...this.queryString};
        const removeField = ['limit', 'sort', 'fields', 'page'];
        removeField.forEach(el => {
            delete queryObj[el];
        });

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g, match => `$${match}`
        );
        // this.query = this.query.find(JSON.parse(queryStr));
        return this;
    };
}