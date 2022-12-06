const Greeter = artifacts.require('./Greeter.sol');

contract('Greeter', () => {
  before(async () => {
    this.greeter = await Greeter.deployed();
  });

  it('deploys successfully', async () => {
    const address = this.greeter.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, '');
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it('deploys with correct default greeting', async () => {
    const greeting = await this.greeter.getGreeting();
    assert.equal(greeting, 'Default Greeting');
  });

  it('changes greeting', async () => {
    const newGreeting = 'New Test Greeting';
    await this.greeter.setGreeting(newGreeting);
    const updatedGreeting = await this.greeter.getGreeting();
    assert.equal(updatedGreeting, newGreeting);
  });
});
