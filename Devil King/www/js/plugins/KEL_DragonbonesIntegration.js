/*
MIT License for Plugin
Copyright <2017> <TheGreenKel>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*:
 *
 * @plugindesc Dragonbone integration
 * 
 * @author TheGreenKel
 * 
 * @param Assets Path
 * @desc The folder that store all of the files exported from DragonBones Software 5.2 (or greater)
 * @default ./dragonbones_assets/
 * 
 * @param Preload Assets
 * @type text[]
 * @desc All DragonBones assets to preload at launch
 * @default ["Demon","DragonBoy","Ubbie", "Swordsman"]
 * 
 * @param Hide BattleSprite
 * @type boolean 
 * @desc Hide the battle sprite assigned in Enemy section of the Editor from showing ingame.
 * @default true
 * 
 * @param Hide Actor If No Dead Animation
 * @type boolean 
 * @desc If Actor does not have 'dragonbone_ani_dead' assigned in Note section then make actor invisible on death.
 * @default true
 * 
 * 
 * @help
 * General Use:
 *      The plugin is only tested on DragonBones 5.2.  I made some big changes 
 *      so it is unlikely that this plugin will be compatible with other plugins.  
 *      Luckily, the code of the plugins is under MIT license so you can 
 *      modify the code as you wish.     
 *          1) Export DragonBones data into the 'Assets Path' parameter.  
 *              Default is 'dragonbones_assets'
 *          2) Add the new armature data into 'Preload Assets' parameter
 *          3) Add extra Note to Actor/Enemy in order to replace default 
 *              sprite and animation.
 *          4) Get more info/tutorial at forum link: 
 *              https://forums.rpgmakerweb.com/index.php?threads/rmmv-dragonbones-2d-animation-integration.81027/
 * 
 * Actor/Enemy Note:
 *      <dragonbone:Demon>                      # Assign Demon, a DragonBone armature, to an actor or Enemy.  You can use any name inside the 'Preload Assets' parameter
 *      <dragonbone_scalex: -0.3>               # Change the x scale of the armature, negative number flip the direction the actor/enemy look at
 *      <dragonbone_scaley: 0.3>                # Change the y scale
 * 
 *  Replace Default Animation with Skeletal animation from DragonBones.  
 *  All 18 animations that actor play can be replaced.  
 *  Only 4 animations (idle, attack, hit react, death) are supported on enemy.
 *      <dragonbone_ani_walk:steady>            # idle animation for actor/enemy
 *      <dragonbone_ani_swing:normalAttack>     # attack animation for actor/enemy
 *      <dragonbone_ani_damage:hit>             # hit react animation for actor/enemy
 *      <dragonbone_ani_dead:dead>              # death animation for actor/enemy
 * 
 *      <dragonbone_ani_wait:steady>            # wait animation during selection for actor
 *      <dragonbone_ani_chant:stun>             # chanting animation for actor
 *      <dragonbone_ani_guard:stun>             # guard animation for actor 
 *      <dragonbone_ani_evade:stun>             # evade animation for actor 
 *      <dragonbone_ani_thrust:stun>            # attack animation for spear weapon? for actor
 *      <dragonbone_ani_missile:stun>           # attack animation for bow weapon? for actor
 *      <dragonbone_ani_skill:stun>             # skill animation for actor
 *      <dragonbone_ani_spell:stun>             # spell animation
 *      <dragonbone_ani_item:stun>              # item use animation
 *      <dragonbone_ani_escape:stun>            # escape animation
 *      <dragonbone_ani_victory:stun>           # victory animation
 *      <dragonbone_ani_dying:stun>             # low hp animation
 *      <dragonbone_ani_abnormal:stun>          # abnormal status animation
 *      <dragonbone_ani_sleep:stun>             # sleep animation
 * 
 * 
 *      Example: Copy into actor/enemy notes to enable DragonBones armature
UBBIE EXAMPLE
<dragonbone:Ubbie>
<dragonbone_scalex:0.2>
<dragonbone_scaley:0.2>
<dragonbone_ani_wait:stand>
<dragonbone_ani_walk:stand>
<dragonbone_ani_swing:atc>
<dragonbone_ani_damage:turn face>
<dragonbone_ani_spell:turn face>
<dragonbone_ani_victory:walk>

DEMON EXAMPLE
<dragonbone:Demon>
<dragonbone_scalex: -0.3>
<dragonbone_scaley: 0.3>
<dragonbone_ani_wait:steady>
<dragonbone_ani_walk:steady>
<dragonbone_ani_swing:normalAttack>
<dragonbone_ani_skill:uniqueAttack>
<dragonbone_ani_spell:uniqueAttack>
<dragonbone_ani_damage:hit>
<dragonbone_ani_dying:stun>
<dragonbone_ani_dead:dead>
<dragonbone_ani_victory:win>

SWORDSMAN EXAMPLE
<dragonbone:Swordsman>
<dragonbone_scalex: -0.3>
<dragonbone_scaley: 0.3>
<dragonbone_ani_wait:steady>
<dragonbone_ani_walk:steady>
<dragonbone_ani_swing:attack1>
<dragonbone_ani_skill:attack1_+1>
<dragonbone_ani_spell:attack2>
<dragonbone_ani_victory:walk2>
 * */


//Global data
var dragonBonesIntegration = [];

dragonBonesIntegration.AssetsPath = '';
dragonBonesIntegration.AssetsArray = [];
dragonBonesIntegration.HideBattleSprite = true;
dragonBonesIntegration.HideActorOnDeathWithoutAnimation = true;
dragonBonesIntegration.ArmatureDatabaseEnemy = [];
dragonBonesIntegration.ArmatureDatabaseActor = [];
dragonBonesIntegration.currentLoadIndex = 0;
dragonBonesIntegration.lastFileName = '';
dragonBonesIntegration.bIsPreloading = false;

(function()
{
    var parameters = PluginManager.parameters('KEL_DragonbonesIntegration');
    dragonBonesIntegration.AssetsPath = parameters['Assets Path'];
    dragonBonesIntegration.AssetsArray = JSON.parse(parameters['Preload Assets']);
    dragonBonesIntegration.HideBattleSprite = parameters['Hide BattleSprite'] == 'true';
    dragonBonesIntegration.HideActorOnDeathWithoutAnimation = parameters['Hide Actor If No Dead Animation'] == 'true';

    //console.log("Hide BattleSprite: " + parameters['Hide BattleSprite']);
    //console.log("Hide BattleSprite: " + dragonBonesIntegration.HideBattleSprite);
    //console.log(dragonBonesIntegration.AssetsPath);
    //console.log(dragonBonesIntegration.AssetsArray);

    dragonBonesIntegration.Performance = function(iMax, jMax)
    {
        if(iMax == undefined || iMax == null)
        {
            iMax = 10;
        }

        if(!jMax == undefined || jMax == null)
        {
            jMax = 10;
        }

        for(var i = 0; i < iMax; i++)
        {
            for(var j = 0; j < jMax; j++)
            {
                var myArmature = dragonBones.PixiFactory.factory.buildArmatureDisplay("DragonBoy");
                myArmature.animation.play("walk");
                SceneManager._scene.addChild(myArmature);
                myArmature.x = i*40 + 200;
                myArmature.y = j*40 + 200;
            }
        }
    }

    dragonBonesIntegration.LoadComplete = function(loader, resources)
    {
        var lastFileName = dragonBonesIntegration.lastFileName;
        console.log("DragonBone Load Complete: " + lastFileName);

        //load dragon bone armature into memory ready for use by dragonBonesIntegration.CreateArmature()
        dragonBones.PixiFactory.factory.parseDragonBonesData(resources[lastFileName + "dragonBonesData"].data);
        dragonBones.PixiFactory.factory.parseTextureAtlasData(resources[lastFileName + "textureDataA"].data, 
            resources[lastFileName + "textureA"].texture);
        
        //load next dragonbone armature if not done
        if(dragonBonesIntegration.bIsPreloading)
        {
            dragonBonesIntegration.currentLoadIndex++;
            dragonBonesIntegration.PreLoadAllArmatures();
        }

    }

    //Load DragonBone data for use by dragonBonesIntegration.CreateArmature()
    dragonBonesIntegration.Load = function(filename)
    {
        if(filename)
        {
            filename = filename.trim();
            console.log("Loading DragonBones Data: " + dragonBonesIntegration.AssetsPath + String(filename));
            dragonBonesIntegration.lastFileName = filename;

            PIXI.loader
            .add(filename + "dragonBonesData", dragonBonesIntegration.AssetsPath + filename + "_ske.json")
            .add(filename + "textureDataA", dragonBonesIntegration.AssetsPath + filename + "_tex.json")
            .add(filename + "textureA", dragonBonesIntegration.AssetsPath + filename + "_tex.png");
            PIXI.loader.once("complete", dragonBonesIntegration.LoadComplete, this, filename);
            PIXI.loader.load();
        }
    }

    //Preload all DragonBones data assigned in 'Preload Assets' parameter
    //This is done at the beginning of the game.
    dragonBonesIntegration.PreLoadAllArmatures = function()
    {
        //only load what is inside of dragonBoneAssetsArray
        if(dragonBonesIntegration.currentLoadIndex < dragonBonesIntegration.AssetsArray.length)
        {
            dragonBonesIntegration.bIsPreloading = true;
            dragonBonesIntegration.Load(dragonBonesIntegration.AssetsArray[dragonBonesIntegration.currentLoadIndex]);
        }
        else
        {
            dragonBonesIntegration.bIsPreloading = false;
            //SceneManager.run(Scene_Boot);
        }
    }

    //Create DragonBones armature ready for display on Scene.
    //DragonBones armature must be already loaded by dragonBonesIntegration.Load()
    dragonBonesIntegration.CreateArmature = function(armatureName, x, y)
    {
        var tempArmature = dragonBones.PixiFactory.factory.buildArmatureDisplay(armatureName);
        if(tempArmature)
        {
            tempArmature.x = x;
            tempArmature.y = y;
        }

        return tempArmature;
    }

    //Play animation for Enemy after the current one finish.
    //This is a hackish way of controlling animation.
    dragonBonesIntegration.PlayIdleAnimationOnDone = function(dragonboneArmature, currentAnimationName, nextAnimationName)
    {
        var currentAnimation = dragonboneArmature.animation._animations[currentAnimationName];

        if(currentAnimation && nextAnimationName)
        {
            var animationDuration = currentAnimation.duration;
            
            if(animationDuration)
            {
                setTimeout(dragonBonesIntegration.PlayNextAnimation, 
                    animationDuration*1000, 
                    dragonboneArmature, nextAnimationName);
            }
            else
            {
                setTimeout(dragonBonesIntegration.PlayNextAnimation, 
                    800, 
                    dragonboneArmature, nextAnimationName);
            }
        }
    }

    //Play animation for armature.  This is a bit redundance but oh well.
    dragonBonesIntegration.PlayNextAnimation = function(dragonboneArmature, animationName)
    {
        //console.log(dragonboneArmature);
        //console.log(animationName);

        if(dragonboneArmature)
        {
            dragonboneArmature.animation.play(animationName);
        }
        
    }

    //(Must have for animation) Tick function required for dragon bone animations
    var alias_SceneManager_update = SceneManager.update;
    SceneManager.update = function() 
    {
        alias_SceneManager_update.call(this);

        if(dragonBones.PixiFactory._clock)
        {
           dragonBones.PixiFactory._clock.advanceTime(-1);
        }
    }

    //Make sure dragonBonesIntegration.PreLoadAllArmatures() finish preloading all data, before starting game
    var alias_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        this.checkError();
        if(dragonBonesIntegration.bIsPreloading == true)
        {
            //console.log('Running isDatabaseLoaded');
            return false;
        }

        return alias_DataManager_isDatabaseLoaded.call(this);
    };

    //Hide default sprite for Enemy when there is a DragonBones armature assigned
    var alias_Sprite_Enemy_prototype_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
    Sprite_Enemy.prototype.loadBitmap = function(name, hue) {
        //console.log("LoadBitMap dragonboneIndex: " + this._enemy.dragonboneIndex);
        //console.log("Hide: " + dragonBonesIntegration.HideBattleSprite);
        if(this._enemy.dragonboneIndex != null && 
            this._enemy.dragonboneIndex != undefined &&
            dragonBonesIntegration.HideBattleSprite)
        {
            this.bitmap = ImageManager.loadEmptyBitmap();
        }
        else
        {
            alias_Sprite_Enemy_prototype_loadBitmap.call(this, name, hue);
        }

    };

    //Hide default character sprite for Actor when there is a DragonBones armature assigned
    var alias_Sprite_Actor_prototype_updateBitmap = Sprite_Actor.prototype.updateBitmap;
    Sprite_Actor.prototype.updateBitmap = function() {
        //console.log(this._actor.dragonboneIndex);
        if(this._actor.dragonboneIndex != null &&
            this._actor.dragonboneIndex != undefined &&
            dragonBonesIntegration.HideBattleSprite)
        {
            this._mainSprite.bitmap = ImageManager.loadEmptyBitmap();
        }
        else
        {
            alias_Sprite_Actor_prototype_updateBitmap.call(this);
        }
    };

    //Hide default weapon sprite for Actor when there is a DragonBones armature assigned
    var alias_Sprite_Actor_prototype_setupWeaponAnimation = Sprite_Actor.prototype.setupWeaponAnimation;
    Sprite_Actor.prototype.setupWeaponAnimation = function() {
        if(this._actor.dragonboneIndex != null &&
            this._actor.dragonboneIndex != undefined &&
            dragonBonesIntegration.HideBattleSprite)
        {
            //do nothing for weapon animation
        }
        else
        {
            alias_Sprite_Actor_prototype_setupWeaponAnimation.call(this);
        }
    };

    //Replace the default 18 sprite animations with DragonBones animation if assigned in the Note section
    var alias_Sprite_Actor_prototype_startMotion = Sprite_Actor.prototype.startMotion;
    Sprite_Actor.prototype.startMotion = function(motionType) {

        //only play dragonbone animation if dragonboneIndex variable is valid
        if(this._actor.dragonboneIndex != null && this._actor.dragonboneIndex != undefined)
        {
            var index = this._actor.dragonboneIndex;
            var armature = dragonBonesIntegration.ArmatureDatabaseActor[index];
            var dragonBoneAnimationName = this._actor.dragonboneAnimation[motionType];

            if(dragonBoneAnimationName && armature && this.lastMotionType !== motionType)
            {
                
                if(motionType == 'damage' || motionType == 'evade' || motionType == 'thrust' ||
                    motionType == 'swing' || motionType == 'missile' || motionType == 'skill' ||
                    motionType == 'spell' || motionType == 'item')
                {
                    //console.log("Once: " + armature.animation.lastAnimationName + ' Type : ' + motionType);
                    //play non-looping animation once.  This is to match dragonbone animation to RPG Maker sprite animation
                    armature.animation.play(dragonBoneAnimationName, 1);
                    //armature.animation.fadeIn(dragonBoneAnimationName, -1, 1, 0, "Normal");
                }
                else
                {
                    //console.log("Loop: " + motionType);
                    armature.animation.play(dragonBoneAnimationName);
                    //armature.animation.fadeIn(dragonBoneAnimationName, -1, -1, 0, "Normal");
                }
                //armature.animation.play(dragonBoneAnimationName);
                this.lastMotionType = motionType;
            }

            //If no animation is assigned for 'dead', then  make character invisible on death
            if(motionType == 'dead' && dragonBoneAnimationName == undefined &&
                dragonBonesIntegration.HideActorOnDeathWithoutAnimation)
            {
                //console.log("Make Invisible");
                this.opacity = 0;
            }      
        }
        alias_Sprite_Actor_prototype_startMotion.call(this);
    };

    /*  OVERWRITE FUNCTIONS FROM RPG MAKER MV (No Aliasing) 
    *   MIGHT MAKE OTHER PLUGIN INCOMPATIBLE
    *
    */

    //var alias_Spriteset_Battle_prototype_createEnemies = Spriteset_Battle.prototype.createEnemies;
    Spriteset_Battle.prototype.createEnemies = function() 
    {
        var enemies = $gameTroop.members();
        var sprites = [];

        for (var i = 0; i < enemies.length; i++) {
            sprites[i] = new Sprite_Enemy(enemies[i]);

            var currentEnemyId = enemies[i]._enemyId;

            var tempArmatureName = $dataEnemies[currentEnemyId].meta.dragonbone;
            var tempScaleX = $dataEnemies[currentEnemyId].meta.dragonbone_scalex;
            var tempScaleY = $dataEnemies[currentEnemyId].meta.dragonbone_scaley;
            var tempStartAnimation = $dataEnemies[currentEnemyId].meta.dragonbone_ani_walk;

            if(tempArmatureName)
            {
                //Delete last battle armature
                if(dragonBonesIntegration.ArmatureDatabaseEnemy[i])
                {
                    dragonBonesIntegration.ArmatureDatabaseEnemy[i].dispose();
                }

                //create new armature
                dragonBonesIntegration.ArmatureDatabaseEnemy[i] = dragonBonesIntegration.CreateArmature(tempArmatureName, 0, 0);
            
                if(dragonBonesIntegration.ArmatureDatabaseEnemy[i])
                {
                    //Store index of armature for later use
                    //Can't store armature on enemy directly because of potential memory leak issue
                    enemies[i].dragonboneIndex = i;

                    if(tempStartAnimation)
                    {
                        dragonBonesIntegration.ArmatureDatabaseEnemy[i].animation.play(tempStartAnimation);
                    }                    
                    if(tempScaleX)
                    {
                        dragonBonesIntegration.ArmatureDatabaseEnemy[i].scale.x = tempScaleX;
                    }                    
                    if(tempScaleY)
                    {
                        dragonBonesIntegration.ArmatureDatabaseEnemy[i].scale.y = tempScaleY;
                    }

                    sprites[i].addChild(dragonBonesIntegration.ArmatureDatabaseEnemy[i]);
                }

            }
            else
            {
                enemies[i].dragonboneIndex = null;
            }
        }

        sprites.sort(this.compareEnemySprite.bind(this));

        for (var i = 0; i < sprites.length; i++) {
            this._battleField.addChild(sprites[i]);
        }

        this._enemySprites = sprites;        
    }

    Spriteset_Battle.prototype.createActors = function() {
        this._actorSprites = [];
        for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
            this._actorSprites[i] = new Sprite_Actor();
    
            var actorId = $gameParty._actors[i];
            if(actorId)
            {
                //console.log($dataActors[actorId]);
                var tempArmatureName = $dataActors[actorId].meta.dragonbone;
                var tempScaleX = $dataActors[actorId].meta.dragonbone_scalex;
                var tempScaleY = $dataActors[actorId].meta.dragonbone_scaley;
                
                if(tempArmatureName)
                {
                    //Delete last battle armature
                    if(dragonBonesIntegration.ArmatureDatabaseActor[i])
                    {
                        dragonBonesIntegration.ArmatureDatabaseActor[i].dispose();
                    }

                    //create new armature
                    dragonBonesIntegration.ArmatureDatabaseActor[i] = dragonBonesIntegration.CreateArmature(tempArmatureName, 0, 0);
                    
                    //initialize dragon data inside the game actor in order to handle animation state changes
                    if(dragonBonesIntegration.ArmatureDatabaseActor[i])
                    {
                        //transition to idle when animation finish playing.  This should stop most animation hitches.
                        $gameActors.actor(actorId).AutoTransitionToIdle = function(event)
                        {
                            switch (event.type) 
                            {
                                case dragonBones.EventObject.COMPLETE:
                                    //console.log("Animation Event: COMPLETE = " + this.dragonboneIndex);
                                    var idleAnimation = this.dragonboneAnimation['walk'];
                                    dragonBonesIntegration.ArmatureDatabaseActor[this.dragonboneIndex].animation.play(idleAnimation);
                                    break;
                                default:
                                    //console.log("Animation Event: " + event.type + " = " + this.dragonboneIndex);
                            }                                           
                        }

                        //Automatically transition to idle when animation is complete by using Event
                        dragonBonesIntegration.ArmatureDatabaseActor[i].addEvent(dragonBones.EventObject.COMPLETE,
                            $gameActors.actor(actorId).AutoTransitionToIdle, 
                            $gameActors.actor(actorId));

                        $gameActors.actor(actorId).dragonboneIndex = i;
                        $gameActors.actor(actorId).dragonboneAnimation = [];
                        //console.log("Meta: " + $dataActors[actorId].meta);

                        //parse meta data into animation
                        for (var key in $dataActors[actorId].meta) {
                            if ($dataActors[actorId].meta.hasOwnProperty(key)) {
                                var animationIndex = key.split("dragonbone_ani_");
                                if(animationIndex[1])
                                {
                                    $gameActors.actor(actorId).dragonboneAnimation[animationIndex[1]] = $dataActors[actorId].meta[key];
                                }
                                //console.log('Key = ' + key +  ' :: ' +  animationIndex + " = " + $dataActors[actorId].meta[key]);
                                //console.log(key + " -> " + $dataActors[actorId].meta[key]);
                            }
                        }
                        //console.log($gameActors.actor(actorId).dragonboneAnimation);

                        if(tempScaleX)
                        {
                            dragonBonesIntegration.ArmatureDatabaseActor[i].scale.x = tempScaleX;
                        }                    
                        if(tempScaleY)
                        {
                            dragonBonesIntegration.ArmatureDatabaseActor[i].scale.y = tempScaleY;
                        }                    

                        this._actorSprites[i].addChild(dragonBonesIntegration.ArmatureDatabaseActor[i]);
                    }                    
                }
            }

            this._battleField.addChild(this._actorSprites[i]);
        }
    };


    //Replace Enemy default attack animation
    Game_Enemy.prototype.performActionStart = function(action) {
        Game_Battler.prototype.performActionStart.call(this, action);
        this.requestEffect('whiten');

        //console.log("DragonboneIndex = " + this.dragonboneIndex);
        if(this.dragonboneIndex != undefined && 
            dragonBonesIntegration.ArmatureDatabaseEnemy[this.dragonboneIndex])
        {
            var animationName = $dataEnemies[this._enemyId].meta.dragonbone_ani_swing;
            var idleAnimationName = $dataEnemies[this._enemyId].meta.dragonbone_ani_walk;

            console.log(animationName);

            if(animationName && idleAnimationName)
            {
                dragonBonesIntegration.ArmatureDatabaseEnemy[this.dragonboneIndex].animation.play(animationName);
                dragonBonesIntegration.PlayIdleAnimationOnDone(dragonBonesIntegration.ArmatureDatabaseEnemy[this.dragonboneIndex], 
                    animationName, idleAnimationName);
            }
        }
        //console.log(this.dragonboneArmature);
    };

    //Replace Enemy default take damage animation
    Game_Enemy.prototype.performDamage = function() {
        Game_Battler.prototype.performDamage.call(this);
        SoundManager.playEnemyDamage();
        

        if(this.dragonboneIndex != undefined && 
            dragonBonesIntegration.ArmatureDatabaseEnemy[this.dragonboneIndex])
        {
            //console.log("Enemy Damage Index: " + this.dragonboneIndex);
            var animationName = $dataEnemies[this._enemyId].meta.dragonbone_ani_damage;
            var idleAnimationName = $dataEnemies[this._enemyId].meta.dragonbone_ani_walk;

            if(animationName && idleAnimationName)
            {
                dragonBonesIntegration.ArmatureDatabaseEnemy[this.dragonboneIndex].animation.play(animationName);
                dragonBonesIntegration.PlayIdleAnimationOnDone(dragonBonesIntegration.ArmatureDatabaseEnemy[this.dragonboneIndex], 
                    animationName, idleAnimationName);
            }
        }
        else
        {
            this.requestEffect('blink');
        }
    };

    //Replace Enemy default death animation
    var alias_Game_Enemy_prototype_performCollapse = Game_Enemy.prototype.performCollapse;
    Game_Enemy.prototype.performCollapse = function() {
        //check that Enemy has a dragonbone armatue + death animaton assigned
        var deathAnimationName = $dataEnemies[this._enemyId].meta.dragonbone_ani_dead;
        if(this.dragonboneIndex != undefined && 
            dragonBonesIntegration.ArmatureDatabaseEnemy[this.dragonboneIndex] && 
            deathAnimationName)
        {
            dragonBonesIntegration.ArmatureDatabaseEnemy[this.dragonboneIndex].animation.play(deathAnimationName);
            SoundManager.playBossCollapse1();
        }
        else
        {
            //play default collapse animation if death animation is not assigned
            alias_Game_Enemy_prototype_performCollapse.call(this);
        }
    };    

    
    /* 
     *   PRELOAD ALL DATA WHEN PLUGIN START
     */
    dragonBonesIntegration.PreLoadAllArmatures();

})();

/*SAMPLE NOTES

UBBIE EXAMPLE
<dragonbone:Ubbie>
<dragonbone_scalex:0.2>
<dragonbone_scaley:0.2>
<dragonbone_ani_wait:stand>
<dragonbone_ani_walk:stand>
<dragonbone_ani_swing:atc>
<dragonbone_ani_damage:turn face>
<dragonbone_ani_spell:turn face>
<dragonbone_ani_victory:walk>


*/