function relop(left,op,right){
    this.left = left
    this.op = op
    this.right=right
}

relop.prototype.toString = function () {
    return "(relop"+this.left + this.op + this.right + ")"
}

module.exports = relop