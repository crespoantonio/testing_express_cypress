const Guid = require('guid')


describe('/user/register', ()=>{
    const registerEndpoint = 'http://localhost:3000/api/user/register'
    it('create user with valid body', ()=>{
        let dynamicEmail = Guid.raw() + '@bar.com'
        let body = {
            name:'testName',
            email: dynamicEmail,
            password:'Test1234'
        }
    
        cy.request('POST', registerEndpoint, body)
        .then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq('testName');
            expect(response.body.email).to.eq(dynamicEmail);
            expect(response.body.password).to.not.eq('Test1234');
    
        })
    })
    
    it('doesnt allow user creation with bad user body', ()=>{
        let badTestUser = {
            name:'1',
            email:'foo',
            password:'1'
        }
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false,
            body: badTestUser
        }).then((response)=>{
            expect(response.status).to.eq(400);
        })
    })

    it('doesnt allow user creation with invalid email', ()=>{
        let badTestUser = {
            name:'validUser',
            email:'invalidEmail',
            password:'validPassword'
        }
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false,
            body: badTestUser
        }).then((response)=>{
            expect(response.status).to.eq(400);
            expect(response.body).to.eq('"email" must be a valid email');
        })
    })


    it('Returns 400 when we hit with no body', ()=>{
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false,
        }).then((response)=>{
            expect(response.status).to.eq(400);
        })
    })

    it('doesnt allow user creation with existing email', ()=>{
        let badTestUser = {
            name:'validUser',
            email:'staticEmail@gmail.com',
            password:'validPassword'
        }
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false,
            body: badTestUser
        }).then((response)=>{
            expect(response.status).to.eq(400);
            expect(response.body).to.eq('Email already registered');
        })
    })
})