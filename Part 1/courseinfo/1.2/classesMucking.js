class Computer {
  constructor(user, processor, memory, gpu, psu) {
    this.user = user;
    this.processor = processor;
    this.memory = memory;
    this.gpu = gpu;
    this.psu = psu;
  }

  infoProcessor() {
    console.log(this.user + "'s CPU model is " + this.processor + ".");
  }

  infoMemory() {
    console.log(this.user + " has " + this.memory + " GB of RAM.");
  }

  infoGPU() {
    console.log(this.user + " 's GPU is a " + this.gpu + " graphics card.");
  }

  infoPSU() {
    console.log(this.user + "'s PSU model is " + this.psu + ".");
  }
}

const myComputer = new Computer("Val", "Intel Core i9-10900K", 16, "GeForce RTX 3090", "Corsair RM 950x");
const dansComputer = new Computer("Dan", "Ryzen 7 5800x", 32, "GeForce RX 7900 XTX", "be quiet! Dark Power 13");

myComputer.infoMemory();
dansComputer.infoGPU();
