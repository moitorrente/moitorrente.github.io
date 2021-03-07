class Entry{
    constructor(depth, level, name, pic, start, end, length, type, usage, integer, decimal, sign){
        this.depth = depth;
        this.level = level;
        this.name = name;
        pic ? this.pic = pic : '';
        start ? this.start = start : '';
        end ? this.end = end : '';
        length ? this.length = length : '';
        type ? this.type = type : '';
        usage ? this.usage = usage : '';
        integer ? this.integer = integer : '';
        decimal ? this.decimal = decimal : '';
        sign ? this.sign = sign : '';
    }
}