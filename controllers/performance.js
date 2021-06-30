exports.performance = (req, res) => {

    const {arquitectura, software } = req.body;
    let perfomanceCpu = arquitectura.cpu_intel ? this.perfomanceIntel(arquitectura, software) : this.performanceAmd(arquitectura, software)
    let perfomanceGpu = this.perfomanceGpu(arquitectura, software)
    console.log(perfomanceGpu)
    res.status(200).send(perfomanceCpu)
}

exports.perfomanceIntel = (arquitectura, software) =>{
    const { Cores, Clock } = arquitectura.cpu_intel;
    let min = this.parseToInt(Clock) > this.parseToInt(software.min.intel) 
    let med = this.parseToInt(Clock) > this.parseToInt(software.med.intel)
    if(min === true && med === true){
        return 'Very good'
    }
    if(min === true){
        return 'Good'
    }
    return 'Bad'
}

exports.parseToInt = (string) =>{
    const tmp = string.split("");
    let map = tmp.map(function(str){
        if(!isNaN(parseInt(str))) {
            return str
          }
    });
    let numbers = map.filter(function(value) {
        return value != undefined;
    });
    let coreParse
    if(numbers.length > 2){
        coreParse = numbers[0] +"."+ numbers[1]
    }else{
        coreParse = numbers[0]
    }
    console.log(coreParse)
    return coreParse
}

exports.perfomanceAmd = (arquitectura, software) =>{
    console.log("Cpu intel")
    const { Clock } = arquitectura.cpu_amd;
    let min = this.parseToInt(Clock) > this.parseToInt(software.min.amd) 
    let med = this.parseToInt(Clock) > this.parseToInt(software.med.amd)
    if(min === true && med === true){
        return 'Very good'
    }
    if(min === true){
        return 'Good'
    }
    return 'Bad'
}

exports.perfomanceGpu = (arquitectura, software) =>{
    const { Memory } = arquitectura.gpu;
    console.log("Gpu")
    console.log("Perfonmance",this.parseToInt(Memory) > this.parseToInt(software.min.gpu))
}

/*
    "cpu": 
        { 
            "Name": "Athlon Gold 3150G",
            "Codename": "Dali",
            "Cores": "4",
            "Clock": "3.5 to 3.9 GHz",
            "Socket": "Socket AM4",
            "Process": "12 nm",
            "L3 Cache": "4MB",
            "TDP": "65 W",
            "Released": "Jul 21st, 2020"
        }
        ,
        "gpu" : 
        {

            "Memory": "24 GB, GDDR6X, 384 bit",

        },
        "disk" : "65GB",
        "ram" : "6GB"
    },
    "software" : {
        "min": 
        {
            "amd": "2.5GHZ",
            "intel": " 2.40GHz",
            "gpu" : "1GB",
            "disco" : "65GB",
            "ram" : "4GB"
        },
        "med" : 
        {
            "amd": "4GHZ",
            "intel": "3.2GHZ",
            "gpu" : "2GB",
            "disco" : "65GB",
            "ram" : "8GB"
        }
    }
*/