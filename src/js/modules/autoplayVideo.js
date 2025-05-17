export function autoplayVideo() {

	// const isIphone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
	const isAppleDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && !/CriOS|FxiOS/.test(navigator.userAgent);
	const isMacbook = /Macintosh/.test(navigator.userAgent) && !window.MSStream;
	if (isAppleDevice || isSafari) {
	  if (isMacbook && !isSafari) {
  
	  } else {
		console.log(isSafari);
		const videoElements = document.querySelectorAll('.showreel-video');
  
		videoElements.forEach(video => {
		  const parent = video.parentElement;
		  const poster = video.getAttribute('poster');
		  const sources = video.querySelectorAll('source');
  
		  // Создание нового элемента picture
		  const picture = document.createElement('picture');
		  picture.classList.add('showreel-video');
		  sources.forEach(source => {
			const newSource = document.createElement('source');
			newSource.srcset = source.src;
			newSource.type = source.type;
			picture.appendChild(newSource);
		  });
  
		  // Создание элемента img
		  const img = document.createElement('img');
		  img.src = poster;
		  img.alt = 'Video poster';
          img.style.width = '100%';
		  picture.appendChild(img);
  
		  // Замена video на picture
		  parent.replaceChild(picture, video);
		});
	  }
  
	}
}
