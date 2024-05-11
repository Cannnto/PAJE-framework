class teste{
    constructor(x)
    {
        this.x = x
    }

    testando(test,test2)
    {
        var ts = test.indexOf(test2)
        var a = test.splice(ts,1)
        console.log(a[0].x)

    }
}