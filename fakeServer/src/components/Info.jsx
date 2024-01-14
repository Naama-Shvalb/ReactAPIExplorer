
const Info = () => {
    let currentUser=JSON.parse(localStorage.getItem("storedUser"));
    return(
        <>
        <p>name: {currentUser[0].name}<br/>
        email: {currentUser[0].email}<br/>
        email: {currentUser[0].email}<br/>
        address: <br/>
        street: {currentUser[0].address.street}<br/>
        suite: {currentUser[0].address.suite}<br/>
        city: {currentUser[0].address.city}<br/>
        zipcode: {currentUser[0].address.zipcode}<br/>
        geo: <br/>
        lat: {currentUser[0].address.geo.lat}<br/>
        lng: {currentUser[0].address.geo.lng}<br/>
        phone: {currentUser[0].phone}<br/>
        website: {currentUser[0].website}<br/>
        company: {currentUser[0].company}<br/>
        name: {currentUser[0].company.name}<br/>
        catchPhrase: {currentUser[0].company.catchPhrase}<br/>
        bs: {currentUser[0].company.bs}<br/>
        </p>
            {/* <p>
                name: {currentUser[0].name}<br/>
                username: {currentUser[0].username}<br/>
                email: {currentUser[0].email}<br/>
                address: <br/>
                    street: {currentUser[0].address.street}<br/>
                    suite: {currentUser[0].address.suite}<br/>
                    city: {currentUser[0].address.city}<br/>
                    zipcode: {currentUser[0].address.zipcode}<br/>
                    geo: <br/>
                        lat: {currentUser[0].address.geo.lat}<br/>
                        lng: {currentUser[0].address.geo.lng}<br/>
                phone: {currentUser[0].phone}<br/>
                website: {currentUser[0].website}<br/>
                company: {currentUser[0].company}<br/>
                    name: {currentUser[0].company.name}<br/>
                    catchPhrase: {currentUser[0].company.catchPhrase}<br/>
                    bs: {currentUser[0].company.bs}<br/>
            </p> */}
        </>
    )
}
export default Info;