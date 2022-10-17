import {
    createStubInstance,
    expect,
    sinon,
    StubbedInstanceWithSinonAccessor,
  } from '@loopback/testlab';
  import {CustomerRepository} from '../../../repositories';
  import {CustomerController} from '../../../controllers';
  import {Customer} from '../../../models';
  
  describe('UserController (unit)', () => {
      let repository: StubbedInstanceWithSinonAccessor<CustomerRepository>;
      beforeEach(givenStubbedRepository);
      
      describe('replaceById()', () => {
        it('replace user with the given id', async () => {
          const controller = new CustomerController(repository);

          await controller.replaceById(1,new Customer({
            name: 'Abdul',
            website: 'www.xyz.com',
            address: 'China'
          }));
          sinon.assert.calledWithMatch(repository.stubs.replaceById, 1, new Customer({
            name: 'Abdul',
            website: 'www.xyz.com',
            address: 'China'
          }));
        });
      });

      describe('findById()', () => {
        it('find user with the given id', async () => {
          const controller = new CustomerController(repository);
          const fetchedCustomers = 
            new Customer({
              id: 1,
              name: 'Abdul',
              website: 'www.abc.com',
              address: 'China',
            });
          repository.stubs.findById.resolves(fetchedCustomers);
          const users = await controller.findById(1);
    
          expect(users).to.deepEqual(fetchedCustomers);
          sinon.assert.calledWithMatch(repository.stubs.findById,1);
        });
      });
      describe('find()', () => {
        it('get the users', async () => {
          const controller = new CustomerController(repository);
    
          const fetchedUsers = [
            new Customer({
              id: 1,
              name: 'Abdul',
              website: 'www.abc.com',
              address: 'China',
            }),
            new Customer({
              id: 2,
              name: 'Abdul',
              website: 'www.xyz.com',
              address: 'China'
            }),
          ];
    
          repository.stubs.find.resolves(fetchedUsers);
    
          const users = await controller.find();
    
          expect(users).to.deepEqual(fetchedUsers);
          sinon.assert.calledWithMatch(repository.stubs.find);
        });
      });
    
 
    
      function givenStubbedRepository() {
        repository = createStubInstance(CustomerRepository);
      }
    });