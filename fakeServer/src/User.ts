export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: number;
    website: number;
    company: Company;
  
    constructor(
      id: number,
      name: string,
      username: string,
      email: string,
      address: Address,
      phone: number,
      website: number,
      company: Company
    ) {
      this.id = id;
      this.name = name;
      this.username = username;
      this.email = email;
      this.address = address;
      this.phone = phone;
      this.website = website;
      this.company = company;
    }
  }
  
  export class Address {
    street: string;
    suite: string;
    city: string;
    zipcode: number;
    geo: Geo;
  
    constructor(street: string, suite: string, city: string, zipcode: number, geo: Geo) {
      this.street = street;
      this.suite = suite;
      this.city = city;
      this.zipcode = zipcode;
      this.geo = geo;
    }
  }
  
  export class Geo {
    lat: number;
    lng: number;
  
    constructor(lat: number, lng: number) {
      this.lat = lat;
      this.lng = lng;
    }
  }
  
  export class Company {
    name: string;
    catchPhrase: string;
    bs: string;
  
    constructor(name: string, catchPhrase: string, bs: string) {
      this.name = name;
      this.catchPhrase = catchPhrase;
      this.bs = bs;
    }
  }
  