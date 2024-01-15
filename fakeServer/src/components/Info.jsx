
const Info = () => {
    const users = JSON.parse(localStorage.getItem("storedUsers"));
    const currentUser = users[users.length-1];    
    return (
        <>
        <h1>Info</h1>
            <p>
                name: {currentUser.name}<br />
                email: {currentUser.email}<br />
                username: {currentUser.username}<br />
                address: <br />
                street: {currentUser.address.street}<br />
                suite: {currentUser.address.suite}<br />
                city: {currentUser.address.city}<br />
                zipcode: {currentUser.address.zipcode}<br />
                geo: <br />
                lat: {currentUser.address.geo.lat}<br />
                lng: {currentUser.address.geo.lng}<br />
                phone: {currentUser.phone}<br />
                website: {currentUser.website}<br />
                company: <br />
                name: {currentUser.company.name}<br />
                catchPhrase: {currentUser.company.catchPhrase}<br />
                bs: {currentUser.company.bs}<br />
            </p>
        </>
    )
}
export default Info;