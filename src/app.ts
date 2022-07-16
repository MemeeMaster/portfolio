const Autobind = (_: any, _2: any, descriptor: PropertyDescriptor) => {
    const originalFn = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        get(){
            return originalFn.bind(this);
        }
    }
    return adjDescriptor;
}

class Nav {
    navSection: HTMLDivElement;
    barsBtn: HTMLElement;
    navMobile: HTMLDivElement;
    hideBtn: HTMLElement;
    navBtns: NodeListOf<HTMLButtonElement>;

    constructor() {
        this.navSection = document.querySelector('.nav')!;
        this.barsBtn = document.querySelector('.fa-bars')!;
        this.navMobile = document.querySelector('.nav__mobile-screen')!;
        this.hideBtn = document.querySelector('.fa-xmark')!;
        this.navBtns = document.querySelectorAll('.nav__mobile-screen-link')!;
        let lastScroll = 0;

        this.barsBtn.addEventListener('click', this.handleNav);
        this.hideBtn.addEventListener('click', this.handleNav);

        window.addEventListener('scroll', () => {
            lastScroll = this.navBehavior(lastScroll);
        });

        this.navBtns.forEach(el => {
            el.addEventListener('click', this.handleNav)
        });
    }

    @Autobind
    handleNav(){
        this.navMobile.classList.toggle('hide-nav');
        this.navMobile.classList.toggle('show-nav');
    }

    navBehavior(lastScroll: number){
        const currentScroll = window.scrollY;

        if(currentScroll <=0)
            this.navSection.classList.remove('nav-up');
        
        if(currentScroll > lastScroll && !this.navSection.classList.contains('nav-down')){
            this.navSection.classList.remove('nav-up');
            this.navSection.classList.add('nav-down');
        }

        if(currentScroll < lastScroll && this.navSection.classList.contains('nav-down')){
            this.navSection.classList.remove('nav-down');
            this.navSection.classList.add('nav-up');
        }

        lastScroll = currentScroll;
        return lastScroll;
    }
}

class Work{
    sitesBtn: HTMLButtonElement;
    appsBtn: HTMLButtonElement;

    constructor(){
        this.sitesBtn = document.querySelector('.sites')!;
        this.appsBtn = document.querySelector('.apps')!;

        this.sitesBtn.addEventListener('click', () => {
            this.showSites(this.sitesBtn, this.appsBtn);
        });
        this.appsBtn.addEventListener('click', () => {
            this.showSites(this.appsBtn, this.sitesBtn);
        });
    }

    showSites(selectedBtn: HTMLButtonElement, anotherBtn: HTMLButtonElement){
        const siteSec: HTMLDivElement = document.querySelector('.work__container-sites')!;
        const appSec: HTMLDivElement = document.querySelector('.work__container-apps')!;

        if(selectedBtn.classList.contains('button--selected')){
            return;
        } else {
            selectedBtn.classList.add('button--selected');
            anotherBtn.classList.remove('button--selected');

            if(selectedBtn.classList.contains('sites')){
                siteSec.style.display = 'flex';
                appSec.style.display = 'none';
            } else {
                siteSec.style.display = 'none';
                appSec.style.display = 'flex';
            }
        }
    }
}

class Skills{
    skillBtns: NodeListOf<HTMLDivElement>;
    skillStars: HTMLDivElement;
    constructor(){
        this.skillBtns = document.querySelectorAll('.skills__block-tabs-tab')!;
        this.skillStars = document.querySelector('.skills__block-stars')!;

        this.skillBtns.forEach(el => {
            el.addEventListener('click', this.changeSkill);
        });
    }

    @Autobind
    changeSkill(e: MouseEvent){
        this.clearButtons();
        const btn = e.target as HTMLDivElement;

        switch (btn.outerText) {
            case 'HTML':
                this.skillBtns[0].classList.add('button--selected');
                this.skillStars.innerHTML = `<i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star"></i>`;
                break;
            case 'CSS':
                this.skillBtns[1].classList.add('button--selected');
                this.skillStars.innerHTML = `<i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
                <i class="fa-regular fa-star"></i>`;
                break;
            case 'SCSS':
                this.skillBtns[2].classList.add('button--selected');
                this.skillStars.innerHTML = `<i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star"></i>`;
                break;
            case 'JavaScript':
                this.skillBtns[3].classList.add('button--selected');
                this.skillStars.innerHTML = `<i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
                <i class="fa-regular fa-star"></i>`;
                break;
            case 'TypeScript':
                this.skillBtns[4].classList.add('button--selected');
                this.skillStars.innerHTML = `<i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>`;
                break;
            default:
                break;
        }
    }

    clearButtons(){
        this.skillBtns.forEach(el => {
            if(el.classList.contains('button--selected'))
                el.classList.remove('button--selected');
        })
    }
}

new Nav();
new Work();
new Skills();