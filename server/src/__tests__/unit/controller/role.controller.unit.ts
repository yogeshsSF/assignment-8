import {
    createStubInstance,
    expect,
    sinon,
    StubbedInstanceWithSinonAccessor,
  } from '@loopback/testlab';
  import {RoleRepository} from '../../../repositories';
  import {RoleController} from '../../../controllers';
  import {Role} from '../../../models';
  
  describe('UserController (unit)', () => {
      let repository: StubbedInstanceWithSinonAccessor<RoleRepository>;
      beforeEach(givenStubbedRepository);
      
      describe('create()', () => {
        it('create role with the given id', async () => {
          const controller = new RoleController(repository);

          await controller.create(new Role({
              id: 1,
              name: 'Abdul',
              key: 'abc',
              description: 'Engineer'
          }));
          sinon.assert.calledWithMatch(repository.stubs.create, new Role({
              id: 1,
              name: 'Abdul',
              key: 'abc',
              description: 'Engineer'
          }));
        });
      });

      describe('findById()', () => {
        it('find role with the given id', async () => {
          const controller = new RoleController(repository);
          const fetchedUsers = 
            new Role({
              id: 1,
              name: 'Abdul',
              key: 'abc',
              description: 'Engineer'
            });
          repository.stubs.findById.resolves(fetchedUsers);
          const users = await controller.findById(1);
    
          expect(users).to.deepEqual(fetchedUsers);
          sinon.assert.calledWithMatch(repository.stubs.findById,1);
        });
      });
      describe('find()', () => {
        it('get the roles', async () => {
          const controller = new RoleController(repository);
    
          const fetchedRoles = [
            new Role({
              id: 1,
              name: 'Abdul',
              key: 'abc',
              description: 'Engineer',
            }),
            new Role({
              id: 2,
              name: 'Abdul',
              key: 'xyz',
              description: 'Doctor'
            }),
          ];
    
          repository.stubs.find.resolves(fetchedRoles);
    
          const users = await controller.find();
    
          expect(users).to.deepEqual(fetchedRoles);
          sinon.assert.calledWithMatch(repository.stubs.find);
        });
      });
    
 
    
      function givenStubbedRepository() {
        repository = createStubInstance(RoleRepository);
      }
    });