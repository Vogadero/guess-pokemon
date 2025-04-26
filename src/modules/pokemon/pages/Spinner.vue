<template>
  <div class="inline-block relative w-20 h-20">
    <div class="absolute border-4 border-white opacity-100 rounded-full 
              animate-[ripple_1s_cubic-bezier(0,0.2,0.8,1)_infinite]"></div>
    <div class="absolute border-4 border-white opacity-100 rounded-full 
              animate-[ripple_1s_cubic-bezier(0,0.2,0.8,1)_infinite_-500ms]"></div>
  </div>
</template>

<style>
@keyframes ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>