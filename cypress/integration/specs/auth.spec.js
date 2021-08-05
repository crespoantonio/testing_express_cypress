it('Returns 200 when we hit /register', ()=>{
    let body = {
        name:'testName',
        email:'foo@bar.com',
        password:'Test'
    }

    cy.request('POST', 'http://localhost:3000/api/user/register', body)
    .then((response)=>{
        expect(response.status).to.eq(200);
    })
})

it('Returns 400 when we hit /register with no body', ()=>{
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/user/register',
        failOnStatusCode: false,
    }).then((response)=>{
        expect(response.status).to.eq(400);
    })
})