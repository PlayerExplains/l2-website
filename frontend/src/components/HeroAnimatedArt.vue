<template>

  <div class="hero-art">

    <div class="hero-art-stage">

      <div class="wind-streaks" aria-hidden="true">

        <span v-for="n in 4" :key="'w-' + n" class="wind-line" :style="windStyle(n)"></span>

      </div>

      <div class="particles" aria-hidden="true">

        <span v-for="n in 8" :key="'p-' + n" class="particle" :style="particleStyle(n)"></span>

      </div>



      <svg class="fx-layer" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">

        <path class="cape-fold fold-a" d="M62 24 Q66 38, 64 54 T58 82" />

        <path class="cape-fold fold-b" d="M68 26 Q74 42, 72 58 Q70 72, 66 86" />

        <path class="cape-fold fold-c" d="M74 30 Q80 48, 77 64 Q74 76, 70 88" />

        <path class="cape-fold fold-d" d="M38 28 Q32 46, 34 64 Q36 76, 40 84" />

        <path class="hair-strand hair-1" d="M46 12 C44 28, 42 42, 40 55" />

        <path class="hair-strand hair-2" d="M54 10 C56 26, 58 40, 60 52" />

      </svg>



      <div class="magic-pulse" aria-hidden="true"></div>



      <img

        src="/hero-animated.png?v=5"

        alt="Elf mage character artwork"

        class="hero-character"

        width="480"

        height="640"

        loading="eager"

        fetchpriority="high"

      />

    </div>

  </div>

</template>



<script setup>

function windStyle(n) {

  return {

    top: `${18 + n * 16}%`,

    animationDelay: `${n * 0.8}s`,

    animationDuration: `${3 + n * 0.3}s`,

  };

}



function particleStyle(n) {

  return {

    left: `${10 + (n * 11) % 80}%`,

    top: `${15 + (n * 13) % 70}%`,

    animationDelay: `${n * 0.6}s`,

    animationDuration: `${3.5 + (n % 3) * 0.5}s`,

  };

}

</script>



<style scoped>

.hero-art {

  width: 100%;

  max-width: 580px;

  margin: 0 auto;

}



.hero-art-stage {

  position: relative;

  line-height: 0;

}



.hero-character {

  position: relative;

  z-index: 2;

  display: block;

  width: 100%;

  height: auto;

  max-height: min(88vh, 820px);

  object-fit: contain;

  object-position: center bottom;

  background: transparent;

  filter: drop-shadow(0 14px 28px rgba(55, 42, 82, 0.11));

}



.wind-streaks,

.particles,

.fx-layer,

.magic-pulse {

  position: absolute;

  inset: 0;

  pointer-events: none;

}



.wind-streaks {

  z-index: 3;

  overflow: hidden;

}



.wind-line {

  position: absolute;

  left: -30%;

  width: 35%;

  height: 1px;

  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);

  animation: windBlow linear infinite;

}



@keyframes windBlow {

  0% { transform: translateX(0); opacity: 0; }

  15% { opacity: 0.45; }

  100% { transform: translateX(400%); opacity: 0; }

}



.particles { z-index: 3; }



.particle {

  position: absolute;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.6);

  box-shadow: 0 0 5px rgba(192, 38, 211, 0.2);

  width: 3px;

  height: 3px;

  animation: particleFloat ease-in-out infinite;

}



@keyframes particleFloat {

  0%, 100% { transform: translate(0, 0); opacity: 0.2; }

  50% { transform: translate(8px, -14px); opacity: 0.75; }

}



.fx-layer {

  z-index: 3;

  width: 100%;

  height: 100%;

  opacity: 0.3;

}



.cape-fold {

  fill: none;

  stroke: rgba(100, 30, 140, 0.2);

  stroke-width: 0.55;

  stroke-linecap: round;

  stroke-linejoin: round;

  vector-effect: non-scaling-stroke;

}



.fold-a {

  transform-origin: 62% 24%;

  animation: capeDriftA 6s ease-in-out infinite;

}



.fold-b {

  transform-origin: 68% 26%;

  animation: capeDriftB 5.2s ease-in-out infinite;

  animation-delay: -1.4s;

}



.fold-c {

  transform-origin: 74% 30%;

  animation: capeDriftC 4.8s ease-in-out infinite;

  animation-delay: -2.2s;

}



.fold-d {

  transform-origin: 38% 28%;

  animation: capeDriftD 5.6s ease-in-out infinite;

  animation-delay: -0.8s;

  opacity: 0.7;

}



@keyframes capeDriftA {

  0%, 100% { transform: rotate(0deg) translateX(0); }

  40% { transform: rotate(1.5deg) translateX(2px); }

  70% { transform: rotate(-0.8deg) translateX(-1px); }

}



@keyframes capeDriftB {

  0%, 100% { transform: rotate(0deg) skewX(0deg); }

  35% { transform: rotate(2deg) skewX(1.2deg); }

  65% { transform: rotate(-1.2deg) skewX(-0.6deg); }

}



@keyframes capeDriftC {

  0%, 100% { transform: rotate(0deg) translateY(0); }

  50% { transform: rotate(-1.8deg) translateY(2px) translateX(1px); }

}



@keyframes capeDriftD {

  0%, 100% { transform: rotate(0deg); }

  45% { transform: rotate(-1.2deg) translateX(-2px); }

}



.hair-strand {

  fill: none;

  stroke: rgba(255, 255, 255, 0.3);

  stroke-width: 0.4;

  stroke-linecap: round;

  vector-effect: non-scaling-stroke;

}



.hair-1 { animation: hairSway 3.2s ease-in-out infinite; }

.hair-2 { animation: hairSway 2.8s ease-in-out infinite reverse; animation-delay: -0.6s; }



@keyframes hairSway {

  0%, 100% { transform: rotate(-1deg); }

  50% { transform: rotate(3deg); }

}



.magic-pulse {

  z-index: 4;

  top: 12%;

  right: 18%;

  left: auto;

  bottom: auto;

  width: 18%;

  height: 14%;

  border-radius: 50%;

  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);

  animation: magicPulse 3s ease-in-out infinite;

}



@keyframes magicPulse {

  0%, 100% { opacity: 0.3; transform: scale(0.85); }

  50% { opacity: 0.65; transform: scale(1.1); }

}



@media (prefers-reduced-motion: reduce) {

  .wind-line,

  .particle,

  .fold-a,

  .fold-b,

  .fold-c,

  .fold-d,

  .hair-1,

  .hair-2,

  .magic-pulse {

    animation: none;

  }

}



@media (max-width: 968px) {

  .hero-art {

    max-width: 380px;

  }



  .hero-character {

    max-height: 480px;

  }

}

</style>


