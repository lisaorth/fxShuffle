// A deterministic shuffle function for use on fxHash, shuffle code from Mike Bostock's tutorial on Fisher-Yates Shuffle: https://bost.ocks.org/mike/shuffle/

//fxhash requires you to insert the following code snippet in the <head> section of your index.html
/*
<script id="fxhash-snippet">
  //---- do not edit the following code (you can indent as you wish)
  let alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
  var fxhash = "oo" + Array(49).fill(0).map(_=>alphabet[(Math.random()*alphabet.length)|0]).join('')
  let b58dec = str=>[...str].reduce((p,c)=>p*alphabet.length+alphabet.indexOf(c)|0, 0)
  let fxhashTrunc = fxhash.slice(2)
  let regex = new RegExp(".{" + ((fxhashTrunc.length/4)|0) + "}", 'g')
  let hashes = fxhashTrunc.match(regex).map(h => b58dec(h))
  let sfc32 = (a, b, c, d) => {
    return () => {
      a |= 0; b |= 0; c |= 0; d |= 0
      var t = (a + b | 0) + d | 0
      d = d + 1 | 0
      a = b ^ b >>> 9
      b = c + (c << 3) | 0
      c = c << 21 | c >>> 11
      c = c + t | 0
      return (t >>> 0) / 4294967296
    }
  }
  var fxrand = sfc32(...hashes)
  // true if preview mode active, false otherwise
  // you can append preview=1 to the URL to simulate preview active
  var isFxpreview = new URLSearchParams(window.location.search).get('preview') === "1"
  // call this method to trigger the preview
  function fxpreview() {
    console.log("fxhash: TRIGGER PREVIEW")
  }
  //---- /do not edit the following code
</script>
*/

//I like to start my fxHash sketches with the following lines of code at the top, so I can use a deterministic random & choose. The random is required for the fxShuffle to work correctly, I just find myself using the choose in most of my sketches, however it's not required for fxShuffle to work:

let random = (a = 1, b = 0) => fxrand() * (b - a) + a
let choose = (dsp) => dsp[Math.floor(random(dsp.length))]

//This is the deterministic shuffle function, I like to add at end of sketch after draw function:

function fxShuffle(array) {
  var s = array.length, t, i;

  // While there remain elements to shuffle…
  while (s) {

    // Pick a remaining element…
    i = Math.floor(random() * s--);

    // And swap it with the current element.
    t = array[s];
    array[s] = array[i];
    array[i] = t;
  }

  return array;
}
