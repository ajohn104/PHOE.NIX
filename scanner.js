var file= process.argv[2];
var fs = require('fs');

var indent = /[\t]|[\s]{4}/
var id= /[A-Za-z][A-Za-z0-9_]*/;
var intLit= /[0-9]+/;
var Double= /intLit\.intLit/;
var bool= /true|false/;
var string= /"([^"\\]|[\\][\\bfnrt])*"/;
var type = /(void|int|double|string|bool)/;
var keyword = /(?:return|print|prompt|args|if|else|elseif|for|while|until|class|lambda|public|private|header)/;
var paren = /[()\[\]]/;
var assop= /==|=|\+=|-=|\/=|\*=|%=/;
var addop= /\+{1,2}|-{1,2}/;
var multop= /\/|%|\*{1,2}/;
var relop= />|<|<=|>=|&|!=|\|\|/;
var misc = /::|:=:|:|\./;

var line_Num = 1;
var line_Pos=0;
var tokens = [];

module.exports = {
	function scan(filepath){
		return readFile(file);
	}
}
function readFile(file){
fs.readFile(file, {encoding: 'utf-8'}, function (err, data) {
	if (err) throw err;
	var array_Of_Lines = data.split("\n");
	for(line in array_Of_Lines ) {
		if (!(/^\s+$/g.test(array_Of_Lines[line]))){
			getTokens(array_Of_Lines[line]+'');
			addToken(line_Num,array_Of_Lines[line].length,"EOL","\n");
		}
		line_Num++;
	}
	for(token in tokens){
		console.log(tokens[token]);
	}
	return tokens;
});
}

function getTokens(line){
	var indents =true;
	line_Pos = 0;
	while(true){
		if(!isToken("indent",indent,line)){break;}
	}
	while (line_Pos<line.length-1){
		if(isToken("$",keyword,line)){}
		else{
		if(isToken("type",type,line)){}
		else{
		if(isToken("string",string,line)){}
		else{	
		if(isToken("bool",bool,line)){}
		else{	
		if(isToken("double",Double,line)){}
		else{
		if(isToken("int",intLit,line)){}
		else{
		if(isToken("id",id,line)){}
		else{	
		if(isToken("paren",paren,line)){}
		else{	
		if(isToken("quote",quote,line)){}
		else{	
		if(isToken("assop",assop,line)){}
		else{	
		if(isToken("relop",relop,line)){}
		else{
		if(isToken("multop",multop,line)){}
		else{
		if(isToken("addop",addop,line)){}
		else{
		if(isToken("misc",misc,line)){}
		else{
		
		//add more microsyntax lines here if needed
		
		//if the next char isn't a space it brings up the error dialogue
		var space = /^\s/;
		if (space.test(line.substring(line_Pos))){line_Pos++;}
		else{
		var pos = "^";
		var x;
		for (x=0; x<line_Pos; x++){pos = "-"+pos;}
		var alert = "Syntax Error at: Line " + line_Num + " Char: " + line_Pos;
		var error = alert + "\n" + line + "\n" + pos;
		throw error;
		}
		}}}}}}}}}}}}}}
	}
}


function isToken(type,regex,line){
	var match = matchIndex(regex,line.substring(line_Pos));
	if(match[0]){
		if(type=="$"){type=match[1];}
		addToken(line_Num,line_Pos,type,match[1]);
		line_Pos+=match[2];
		return true;
	}else{
		return false;
	}
}

function addToken(line_Num, line_Pos, type, lexeme){

	var token ={
		line_Num:line_Num,
		line_Pos:line_Pos,
		type:type,
		lexeme:lexeme
	};

	tokens.push(token);
}

function matchIndex(regex, string){
	var match = regex.exec(string);
	var myMatch = [];
		
	if (match != null&&match.index==0){
		myMatch.push(true);
		myMatch.push(match[0]);
		myMatch.push(match[0].length);
	} else {
		myMatch.push(false);
	}	
	return myMatch;
}
