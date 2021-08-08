describe('/user/login', ()=>{
    const loginEndpoint = 'http://localhost:3000/api/user/login'

    it('log in with valid user', ()=>{
        let staticUser = {
            email:'staticemail@estatic.com',
            password:'estaticemailpassword'
        }
        cy.request({
            method: 'POST',
            url: loginEndpoint,
            body: staticUser
        }).then((response)=>{
            expect(response.status).to.eq(200);
        })
    })
})