$(function()
{
    var playerTrack = $("#player-track");
	var bgArtwork = $('#bg-artwork');
	var bgArtworkUrl;
	var albumName = $('#album-name');
	var trackName = $('#track-name');
	var albumArt = $('#album-art'),
		sArea = $('#s-area'),
		seekBar = $('#seek-bar'),
		trackTime = $('#track-time'),
		insTime = $('#ins-time'),
		sHover = $('#s-hover'),
        playPauseButton = $("#play-pause-button"),
        playRepeatButton = $("#play-repeat"),
        openMenu = $('#play-menu'),
		i = playPauseButton.find('i'),
		tProgress = $('#current-time'),
		tTime = $('#track-length'),
		seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
		buffInterval = null, tFlag = false;
	
	var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;
	
	var songs = [{
		artist: "l.tus",
		name: "lotus blossoms",
		url: "Musics/lotus blossoms.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000574847348-6xfhf5-original.jpg"
	},{
		artist: "gny",
		name: "as the rain pours outside",
		url: "Musics/as the rain pours outside.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000481580919-iztca5-original.jpg"
	},{
		artist: "Aoba",
		name: "Shogonodo(DalBeats Re - Work)",
		url: "Musics/Aoba - Shogonodo(DalBeats Re - Work).mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000234256890-edhgn3-original.jpg"
	},{
		artist: "harren",
		name: "midnight in asakusa",
		url: "Musics/midnight in asakusa.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000371965452-munoop-original.jpg"
	},{
		artist: "harren",
		name: "sentimental",
		url: "Musics/sentimental.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000574847348-6xfhf5-original.jpg"
	},{
		artist: "sugi.wa",
		name: "nevermind",
		url: "Musics/sugi.wa - nevermind.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000598092845-oatzej-original.jpg"
	},{
		artist: "Moving",
		name: "I eat Plants for a living",
		url: "Musics/I eat Plants for a living - Moving.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000248725672-iej53a-original.jpg"
	}, {
		artist: "Fujishen",
		name: "Tweetheart",
		url: "Musics/LpaS8e1gikMH.128.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-33k8xtyGROfQRCyj-eaUYzw-original.jpg"
}, {
		artist: "Russ",
		name: "Psycho Pt. 2 (beat)",
		url: "Musics/Russ - Psycho Pt. 2 (beat) _ nt reboot.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000371965452-munoop-original.jpg"
}, {
		artist: "$unXIX",
		name: "Sunday Morning",
		url: "Musics/xMol5nRIJ4JL.128.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-QqahOIq02lLBemE8-8r1bZw-original.jpg"
}, {
		artist: "Elijah Who",
		name: "Hello",
		url: "Musics/elijahwho-hello.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000481697607-ar2wrg-original.jpg"
}, {
		artist: "ayeon & lofty ",
		name: "sketches of home EP",
		url: "Musics/ayeon & lofty - sketches of home EP.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000631212565-fjlxzs-original.jpg"
}, {
		artist: "Ai Means Love.",
		name: "would you? (w/ maggery)",
		url: "Musics/Ai Means Love..mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000598092845-oatzej-original.jpg"
}, {
		artist: "Frad",
		name: "Luv Letters ",
		url: "Musics/Luv Letters - Frad.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000371965452-munoop-original.jpg"
}, {
		artist: "Jordy Chandra ",
		name: "Rain Will Soon End.",
		url: "Musics/Rain Will Soon End..mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000677195866-san8t7-original.jpg"
}, {
		artist: "けｍ SURF ",
		name: "Stay (ft. SwuM).",
		url: "Musics/Stay (ft. SwuM).mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-W0HjMQuh9odSzmTk-gtoeLw-original.jpg"
},{
		artist: "Silk.y ",
		name: " When We.....",
		url: "Musics/Silk.y. - When We.....mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000371965452-munoop-original.jpg"
},{
		artist: "Nom.",
		name: "White As Snow",
		url: "Musics/White As Snow.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000465448080-prc1h0-original.jpg"
},{
		artist: "Nom",
		name: "Sunshine Time !",
		url: "Musics/Sunshine Time !.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000393366411-zsuzhj-original.jpg"
},{
		artist: "Ahntow",
		name: "5AM",
		url: "Musics/5AM(Out on spotify).mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000539597682-uyj7jl-original.jpg"
},{
		artist: "ahiru アヒル",
		name: "dear carla.",
		url: "Musics/dear carla.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000225412113-6rufcl-original.jpg"
},{
		artist: "Key-One",
		name: "July08",
		url: "Musics/July08.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000223666678-h5rlf1-original.jpg"
},{
		artist: "Outgoing Hikikomori",
		name: "Dancing on my own.",
		url: "Musics/Dancing on my own.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000240456124-qxqevr-original.jpg"
},{
		artist: "lofty",
		name: "hideaway EP",
		url: "Musics/hideaway EP.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000481580919-iztca5-original.jpg"
},{
		artist: "tony stocker",
		name: "flowing with the wind",
		url: "Musics/flowing with the wind.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000574847348-6xfhf5-original.jpg"
},{
		artist: "sayuw ",
		name: "cherry blossom (lust retouch).",
		url: "Musics/sayuw - cherry blossom (lust retouch).mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000234256890-edhgn3-original.jpg"
},{
		artist: "a boy with a balloon",
		name: "what you do when things go wrong",
		url: "Musics/what you do when things go wrong_.mp3",
		picture: "https://raw.githubusercontent.com/PhongLi/Chilltime/master/cover/artworks-000413713464-l67iaw-original.jpg"
},
   ];
	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
	// songs = shuffle(songs);

    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audio.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audio.pause();
            }
        },300);
    }

    // toggle repeat
    function playRepeat()
    {
        isRepeat = !isRepeat;
        audio.loop = isRepeat;
        toggleEnable(isRepeat, playRepeatButton);
    }

    function toggleEnable(condition, element)
    {
        if (condition)
            element.addClass('isEnabled');
        else
            element.removeClass('isEnabled');
    }
    
    function toggleMenu()
    {
        isOpen = !isOpen;
        toggleEnable(isOpen, openMenu);
    }

	function showHover(event)
	{
		seekBarPos = sArea.offset(); 
		seekT = event.clientX - seekBarPos.left;
		seekLoc = audio.duration * (seekT / sArea.outerWidth());
		
		sHover.width(seekT);
		
		cM = seekLoc / 60;
		
		ctMinutes = Math.floor(cM);
		ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
		
		if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
		    insTime.text(ctMinutes+':'+ctSeconds);
            
		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);
		
	}

    function hideHover()
	{
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);		
    }
    
    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
		seekBar.width(seekT);
		hideHover();
    }

    function updateCurrTime()
	{
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

		curMinutes = Math.floor(audio.currentTime / 60);
		curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
		
		durMinutes = Math.floor(audio.duration / 60);
		durSeconds = Math.floor(audio.duration - durMinutes * 60);
		
		playProgress = (audio.currentTime / audio.duration) * 100;
		
		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;
		
		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
		    tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
		    tTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');

        
		seekBar.width(playProgress+'%');
		
		if( playProgress == 100 )
		{
			i.attr('class','fa fa-play');
			seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
			selectTrack(1);
		}
    }
    
    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag, index = null)
    {
        if (index === null) {
            if( flag == 0 || flag == 1 ) {
                ++currIndex;
            } else if (flag === -1) {
                --currIndex;
            }
        } else {
            currIndex = index;
        }

        if( (currIndex > -1) && (currIndex < songs.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');
			
			currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;

            audio.src = songs[currIndex].url;
            
            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');
            
                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
			albumArt.find('img').attr('src', currArtwork);
            $('#album-art img').prop('src', bgArtworkUrl);
            $('.song').removeClass('playingSong');
            $('#song' + currIndex).addClass('playingSong');
        }
        else
        {
            if (currIndex < 0) {
                currIndex = songs.length - 1;
            } else if (currIndex > songs.length - 1) {
                currIndex = 0;
            }
            selectTrack(2);
        }
    }

    function initPlayer()
	{	
        audio = new Audio();
        addSongList();
		selectTrack(0);
		
		audio.loop = false;
        isRepeat = false;
        isOpen = false;

		playPauseButton.on('click',playPause);
		
		sArea.mousemove(function(event){ showHover(event); });
		
        sArea.mouseout(hideHover);
        
        sArea.on('click',playFromClickedPos);
		
        $(audio).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){
            selectTrack(-1);
        });
        playNextTrackButton.on('click',function(){
            selectTrack(1);
        });
        playRepeatButton.on('click', function(){
            playRepeat();
        });
        openMenu.on('click', function(){
            $("#list-song").fadeToggle(300);
            toggleMenu();
        });
    }
    
    function addSongList() {
        songs.forEach((song, index) => {
            const songTemplate = 
            `<div class="song" id="song${index}">
                <i class="fas fa-play"></i>
                <div class="info">
                    ${song.name} - ${song.artist}
                </div>
            </div>`

            $("#list-song").append(songTemplate);
            $('#song' + index).on('click', () => {
                selectTrack(0, index);
                playPause();
            });
        })
        
    }
    
	initPlayer();
});
