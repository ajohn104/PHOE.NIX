function varDec(type,name,exp){
    this.type = type
    this.name = name
    this.exp = exp
}

varDec.prototype.toString = function () {
    return "(varDec"+ this.type + " " + this.op + " " + this.right+")"
}

module.exports = varDec