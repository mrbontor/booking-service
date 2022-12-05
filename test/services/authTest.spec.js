const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const { AuthService } = require('../../app/modules/services');
const { UserRepository } = require('../../app/modules/repositories');
const { Encrypt, Decrypt, VerifyHashPassword } = require('../../app/libraries/encrypting/AEAD');
const Validator = require('../../app/helpers/validateSchema');
const { BadRequestError, UnprocessableEntityError, ValidationError } = require("../../app/helpers/exceptions");
const JwtLib = require('../../app/libraries/encrypting/jwtLibs');

const { buildUser } = require('../builderHelper');
const { generateToken } = require('../tokenHandler');


const sampleRefreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZXlKcGRpSTZJbVZsTkd4cGExZFBUMEpOTUZCV1VHc2lMQ0psYm1OeWVYQjBaV1JFWVhSaElqb2lOekZKVURWWldVVmhZV2xoT0VSdk1saHpaMmRUVjIxb2RsQmFVV1JoYkN0UVdtUTVRbWhvZEdwNFdHYzVTbTl4WjBsbE5HVTFaa1FpTENKaGRYUm9Jam9pY2pJdk5VTnpTakZNWTBoeFMzb3lVM1o1YzFsVVp6MDlJbjA9IiwiaWF0IjoxNjcwMjE3Mzg1LCJleHAiOjE2NzAyMTc0NDUsImF1ZCI6ImdpdGh1Yi5jb20vbXJib250b3IiLCJpc3MiOiJnaXRodWIuY29tL21yYm9udG9yIn0._kXcnFqYY6XpDIGz-xSlcRXwUJLH4nUcjb0ohhukRew'

describe('Authenctication Service', function () {
    let stubService = {
        accessToken: "panjangggggggggggggggggggggggggggggggggg"
    };
    let stubFindUser = buildUser();
    let payload = {
        username: 'test',
        password: 'test'
    }
    let dataToken = {}
    let apiStub, validatorStub, repositoryStub;
    let response = {};
    let payloadValidated = {};

    beforeEach(async () => {
        validatorStub = sinon.stub(Validator, 'validateSchema');
        repositoryStub = sinon.stub(UserRepository, 'findUser')
        apiStub = sinon.stub(AuthService, "signIn");

        payloadValidated = await Validator.validateSchema(payload)
        await UserRepository.findUser({ username: payload.username })
        dataToken = await generateToken();
    });

    afterEach(() => {
        validatorStub.restore();
        repositoryStub.restore();
        apiStub.restore();
    });

    describe('Log In', function () {

        it('Should return access token', async () => {
            validatorStub.returns(payload)
            repositoryStub.returns(stubFindUser)
            apiStub.returns(dataToken)
 
            
            response = await AuthService.signIn(payloadValidated);
            
            expect(validatorStub.calledOnce).to.be.true;
            expect(repositoryStub.calledOnce).to.be.true;
            expect(response.accessToken).to.equal(dataToken.accessToken);
        });

        it('should return UnAuthorized', async () => {
            try {
                validatorStub.returns(payload)
                repositoryStub.returns(null)
                apiStub.returns(stubService)

                response = await AuthService.signIn(payloadValidated);

                throw new UnprocessableEntityError("UnAuthorized");

            } catch (error) {
                expect(apiStub.calledOnce).to.be.true;
                expect(error.status).to.equal(false);          
                expect(error.message).to.equal("UnAuthorized");          
            }
        });

        it('should return UnAuthorized', async () => {
            try {
                validatorStub.returns(payload)
                repositoryStub.returns(null)
                apiStub.returns(stubService)

                aresponse = await AuthService.signIn(payloadValidated);

                throw new UnprocessableEntityError("UnAuthorized");

            } catch (error) {
                expect(apiStub.calledOnce).to.be.true;
                expect(error.status).to.equal(false);          
                expect(error.message).to.equal("UnAuthorized");          
            }
        });

        it('should validation error', async () => {
            try {
                validatorStub.returns(payload)
                repositoryStub.returns(null)
                apiStub.returns(stubService)

                aresponse = await AuthService.signIn(payloadValidated);

                throw new ValidationError();

            } catch (error) {
                expect(apiStub.calledOnce).to.be.true;
                expect(error.status).to.equal(false);          
                expect(error.message).to.equal('Validation Error!');
            }          
        });        
    });

    describe('Refresh Token', function () {
        let tokerVerifierStub, apiStubRefreshToken;
        beforeEach(async () => {
           
           apiStubRefreshToken = sinon.stub(AuthService, "refreshToken"); 
           
        });

        afterEach(() => {
            validatorStub.restore();
            repositoryStub.restore();
            apiStubRefreshToken.restore();
        });

        it('Should return new access token', async () => {
            tokerVerifierStub = sinon.stub(JwtLib, 'VerifyRefreshToken')
            validatorStub.returns(payload)
            repositoryStub.returns(dataToken)
            tokerVerifierStub.returns()

            apiStubRefreshToken.returns(dataToken)
 
            
            response = await AuthService.refreshToken(payloadValidated);

            expect(validatorStub.calledOnce).to.be.true;
            expect(repositoryStub.calledOnce).to.be.true;
            expect(response.accessToken).to.equal(dataToken.accessToken);
        });
        
        
        it('should return UnAuthorized', async () => {
            try {
                validatorStub.returns(payload)
                repositoryStub.returns(null)         
    
                apiStubRefreshToken.returns(null)

                response = await AuthService.refreshToken(payloadValidated);

                throw new UnprocessableEntityError("UnAuthorized");

            } catch (error) {
                expect(repositoryStub.calledOnce).to.be.true;
                expect(error.message).to.equal("UnAuthorized");
            }            
        });

        it('should return UnAuthorized', async () => {
            try {
                validatorStub.returns(null)
                repositoryStub.returns(null)         
    
                apiStubRefreshToken.returns(null)
                               
                response = await AuthService.refreshToken(payloadValidated);

                throw new ValidationError();

            } catch (error) {
                expect(repositoryStub.calledOnce).to.be.true;
                expect(error.message).to.equal('Validation Error!');
            }            
        });
    });

    describe('Log Out', function () {
        let apiStubLogut;
        beforeEach(async () => {
           
           apiStubLogut = sinon.stub(AuthService, "signOut"); 
           
        });

        afterEach(() => {
            validatorStub.restore();
            repositoryStub.restore();
            apiStubLogut.restore();
        });

        it('Should return true', async () => {
            validatorStub.returns(payload)
            repositoryStub.returns(dataToken)

            apiStubLogut.returns(dataToken)
 
            
            response = await AuthService.signOut(payloadValidated);

            expect(validatorStub.calledOnce).to.be.true;
            expect(repositoryStub.calledOnce).to.be.true;
            expect(response.accessToken).to.equal(dataToken.accessToken);
        });
                
        it('should return UnAuthorized', async () => {
            try {
                validatorStub.returns(payload)
                repositoryStub.returns(null)         
    
                apiStubLogut.returns(null)

                response = await AuthService.signOut(payloadValidated);

                throw new UnprocessableEntityError("UnAuthorized");

            } catch (error) {
                expect(repositoryStub.calledOnce).to.be.true;
                expect(error.message).to.equal("UnAuthorized");
            }            
        });

       
    });
});
