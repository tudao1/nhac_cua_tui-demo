
$(document).ready(function () {

    // Apply slick for banner
    $('.slick-container').slick({
        arrows: true,
        centerMode: true,
        infinite: true,
        centerPadding: '177.5px',
        slidesToShow: 1,
        speed: 1200,
        draggable: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        pauseOnFocus: false,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1190,
                settings: {
                    centerPadding: '134.5px'
                }
            }
        ]
    });
    
    $('#footer .cooperation-list').slick({
        arrows: true,
        infinite: true,
        draggable: false,
        dots: false,
        autoplay: false,
        slidesToShow: 5,
    });

    // Handle login form
    $('.login-btn').click(function () {
        $('#overlay').show();
        $('.login-box').show();
    });

    $('#overlay, .close-btn').click(function () {
        $('#overlay').hide();
        $('.login-box').hide();
        $('.signup-box').hide();
    });

    $('.signup-btn').click(function () {
        $('#overlay').show();
        $('.signup-box').show();
    })

    // Handle tab in home
    $(".tab-link").click(function () {
        var tabId = $(this).attr("data-tab");

        $(".tab-link").removeClass("active");
        $(".info-data-container").removeClass("active");

        $(this).addClass("active");
        $("#" + tabId).addClass("active");
    });


    // Handle play music
    var audio = $("#myAudio")[0];
    var playlist = $("#playlist li");
    var playButton = $("#playButton");
    var pauseButton = $("#pauseButton");
    var nextButton = $("#nextButton");
    var prevButton = $("#prevButton");
    var shuffleButton = $("#shuffleButton");
    var repeatButton = $("#repeatButton")
    var progress = $("#progress");
    var progressBar = $(".progress-bar");
    var currentSongIndex = 0;
    var currentTimeDisplay = $("#currentTime");
    var totalTimeDisplay = $("#totalTime");
    var isShuffle = false;
    var isRepeat = false;
    var isEnded = false;
    var volumeSlider = $("#volumeSlider");
    function playSong() {
        audio.play();
        playButton.hide();
        pauseButton.show();
    }

    function pauseSong() {
        audio.pause();
        pauseButton.hide();
        playButton.show();
    }

    function nextSong() {
        playlist.eq(currentSongIndex).removeClass('active')
        if (isShuffle) {
            currentSongIndex = Math.floor(Math.random() * playlist.length);
        } else {
            currentSongIndex++;
            if (currentSongIndex >= playlist.length) {
                currentSongIndex = 0;
            }
        }
        var songSrc = playlist.eq(currentSongIndex).data("src");
        audio.src = songSrc;

        if (isEnded && isRepeat) {
            isEnded = false;
            audio.currentTime = 0;
        }

        playlist.eq(currentSongIndex).addClass('active')
        playSong();
    }

    function previousSong() {
        playlist.eq(currentSongIndex).removeClass('active')
        if (isShuffle) {
            currentSongIndex = Math.floor(Math.random() * playlist.length);
        } else {
            currentSongIndex--;
            if (currentSongIndex < 0) {
                currentSongIndex = playlist.length - 1;
            }
        }
        var songSrc = playlist.eq(currentSongIndex).data("src");
        audio.src = songSrc;

        if (isEnded && isRepeat) {
            isEnded = false;
            audio.currentTime = 0;
        }

        playlist.eq(currentSongIndex).addClass('active')

        playSong();
    }

    function updateProgress() {
        var currentTime = audio.currentTime;
        var duration = audio.duration;
        var progressWidth = (currentTime / duration) * 100 + "%";
        progress.css("width", progressWidth);

        currentTimeDisplay.text(formatTime(currentTime));
        totalTimeDisplay.text(formatTime(duration));

        if (currentTime >= duration && isRepeat) {
            isEnded = true;
            playSong();
        } else {
            isEnded = false;
        }
    }

    function seekTo(event) {
        var progressBar = $(this);
        var progressBarWidth = progressBar.width();
        var clickX = event.pageX - progressBar.offset().left;
        var seekTime = (clickX / progressBarWidth) * audio.duration;
        audio.currentTime = seekTime;
    }

    function toggleShuffle() {
        isShuffle = !isShuffle;
        shuffleButton.toggleClass("active", isShuffle);
    }

    function toggleRepeat() {
        isRepeat = !isRepeat;
        repeatButton.toggleClass("active", isRepeat);
    }


    function formatTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    }

    function updateVolume() {
        audio.volume = volumeSlider.val();
    }

    progressBar.click(seekTo);

    playlist.click(function () {
        currentSongIndex = $(this).index();
        var songSrc = $(this).data("src");
        audio.src = songSrc;
        playlist.removeClass('active')
        $(this).addClass('active')
        playSong();
    });

    playButton.click(function () {
        playSong();
    });

    pauseButton.click(function () {
        pauseSong();
    });

    nextButton.click(function () {
        nextSong();
    });

    prevButton.click(function () {
        previousSong();
    });

    audio.addEventListener("timeupdate", function () {
        updateProgress()
    });

    shuffleButton.click(function () {
        toggleShuffle();
    });

    repeatButton.click(function () {
        toggleRepeat();
    });

    volumeSlider.on("input", updateVolume);
});
