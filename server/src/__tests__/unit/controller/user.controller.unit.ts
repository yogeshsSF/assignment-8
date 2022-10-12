import {
    createStubInstance,
    expect,
    sinon,
    StubbedInstanceWithSinonAccessor,
  } from '@loopback/testlab';
  import {UserRepository} from '../../../repositories';
  import {UserController} from '../../../controllers';
  import {User} from '../../../models';
  
  describe('UserController (unit)', () => {
      let repository: StubbedInstanceWithSinonAccessor<UserRepository>;
      beforeEach(givenStubbedRepository);
    
      describe('find()', () => {
        it('get the users', async () => {
          const controller = new UserController(repository);
    
          const fetchedUsers = [
            new User({
              id: 1,
              first_name: 'Abdul',
              middle_name: 'fakira',
              last_name: 'Kumar',
              address: 'China',
              email: 'cr7@rm.com',
              phone_number: 7822,
              rid: 1,
              cid: 3,
            }),
            new User({
              id: 2,
              first_name: 'Christiano',
              middle_name: 'goal machine',
              last_name: 'Ronaldo',
              address: 'Portugal',
              email: 'cr7@rm.com',
              phone_number: 7777,
              rid: 1,
              cid: 3,
            }),
          ];
    
          repository.stubs.find.resolves(fetchedUsers);
    
          const users = await controller.find();
    
          expect(users).to.deepEqual(fetchedUsers);
          sinon.assert.calledWithMatch(repository.stubs.find);
        });
      });
    
      describe('deleteById()', () => {
        it('delete user with the given id', async () => {
          const controller = new UserController(repository);
          await controller.deleteById(2);
          sinon.assert.calledWithMatch(repository.stubs.deleteById, 2);
        });
      });
    
      function givenStubbedRepository() {
        repository = createStubInstance(UserRepository);
      }
    });