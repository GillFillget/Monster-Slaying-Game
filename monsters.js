const monsterList = [Deadite,Werewolf,Karen,Peter_Griffin,Ghost,Dracula,Gaston,Witch,Zombie];

class Deadite {
    constructor(Health, Sound, Power){
        this.Health = Health;
        this.Power = Power;
        this.Sound = "I'LL SWALLOW YOUR SOUL!";
    }
}

class Werewolf {
    constructor(Health, Sound, Power){
        this.Health = Health;
        this.Power = Power;
        this.Sound = "rawwhh!";
    }
}

class Karen {
    constructor(Health, Sound, Power){
        this.Health = Health;
        this.Power = Power;
        this.Sound = "How DARE you speak to me that way!";
    }
}

class Peter_Griffin{
    constructor(Health, Sound, Power){
        this.Health = Health;
        this.Power = Power;
        this.Sound = "NHEHEHEHEHE";
    }
}

class Ghost {
    constructor(Health, Sound, Power){
        this.Health = Health;
        this.Power = Power;
        this.Sound = "boo...";
    }
}

class Dracula {
    constructor(Health, Sound, Power){
        this.Health = Health;
        this.Power = Power;
        this.Sound = "Whoooo";
    }
}

class Gaston {
    constructor(Health, Sound, Power){
        this.Health = Health;
        this.Power = Power;
        this.Sound = "I eat 5 dozen eggs!"
    }
}

class Witch {
    constructor(Health, Sound, Power){
        this.Health = Health;
        this.Power = Power;
        this.Sound = "hehehehehe!";
    }
}

class Zombie {
    constructor(Health, Sound, Power){
        this.Health = Health;
        this.Power = Power;
        this.Sound = "arrhh!";
    }
}

//----Final Boss----//
class UnmatchedPowerOfTheSun {
    constructor() {
        this.Attack = 2147483647;
        this.Health = 2147483647;
        this.Sound = "BEHOLD";
    }
}