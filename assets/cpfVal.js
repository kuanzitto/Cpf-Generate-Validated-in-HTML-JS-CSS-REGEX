let CpfInputValidate = document.querySelector('.cpf-validator');
let CpfInputGenerate = document.querySelector('.cpf-input-generate');
let BntGenerate = document.querySelector('.cpf-generate');

                                    /*_______________________________*/                        

const IconTrue = document.querySelector('.cpf-icon-valid');
const IconFalse = document.querySelector('.cpf-icon-false');
const IconIncomplete = document.querySelector('.cpf-text-incomplete');

let ValueRecived = false;

    /*________ CPF FORMATTER __________*/   

const CpfFormatter = (CpfRecived, CpfValue) => {

    return CpfRecived.value = CpfValue
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
}                          

class CpfOptions {

    /*________ CPF GENERATE __________*/      


    CpfNumberGenerate = () => {
        const NumberGenerate = Math.floor(Math.random() * 999);
        return NumberGenerate < 100 ? (NumberGenerate < 10 ? ('00'+ NumberGenerate) : ('0' + NumberGenerate)) : NumberGenerate ;
    }

    CPFGenerate = () => {
        this.ArrayGenre = [];

        const CpfNumberOne = this.CpfNumberGenerate(), CpfNumberTwo = this.CpfNumberGenerate(), CpfNumberThree = this.CpfNumberGenerate();

        this.ArrayGenre.push(CpfNumberOne, CpfNumberTwo, CpfNumberThree);
        this.CpfPrimaryNumbers = this.ArrayGenre.toString().replace(/,/g, '', '');

        this.CpfCheckPartOne(this.CpfPrimaryNumbers, '');
    }

    /*________ CPF VALIDATE __________*/       

    CpfCheckPartOne = (Cpf, CpfCheckNumber) => {
        this.CpfArray = [];
        if(Cpf.length == 11 || Cpf.length == 9){
            this.cpf = [...Cpf];   
            this.CpfFirstNumber = this.cpf.slice(0, 9); 
            this.result = this.CpfFirstNumber;
        } else {
            this.regex = /[\W]+/g;
            this.CpfTwoNumber = this.CpfFirstNumber + CpfCheckNumber;
            this.CpfConvert = [...this.CpfTwoNumber.replace(this.regex, '')];
            this.result = this.CpfConvert
        }

        this.CpfInsertArray(this.result, this.CpfArray);
    }

    CpfValue = (CpfValue) => {
        this.CpfTotal = (this.CpfConvert + CpfValue);
        this.CpfResult = this.CpfTotal.replace(this.regex, '');

        if(CpfInputGenerate.value === CpfFormatter('', this.CpfResult)){
            
            IconTrue.setAttribute('class', 'IconTrue');
            IconTrue.classList.add('material-symbols-outlined');
            IconFalse.setAttribute('class', 'cpf-icon-false');
            IconIncomplete.setAttribute('class', 'cpf-text-incomplete');
    
        } else if(CpfInputGenerate.value !== CpfFormatter('', this.CpfResult)) {

            IconFalse.setAttribute('class', 'IconFalse');
            IconFalse.classList.add('material-symbols-outlined');         
            IconTrue.setAttribute('class', 'cpf-icon-valid');
            IconIncomplete.setAttribute('class', 'cpf-text-incomplete');
        }

        if(ValueRecived === true){
            
            CpfInputGenerate.value = CpfFormatter('', this.CpfResult)
            IconIncomplete.setAttribute('class', 'cpf-text-incomplete');
            IconFalse.setAttribute('class', 'cpf-icon-false');
            IconTrue.setAttribute('class', 'cpf-icon-valid');
            ValueRecived = false;       
        }
    }

    CpfInsertArray = (cpfNumber, cpfArray) => {
        let CpfIndex = cpfNumber.length + 1;

        for(let CpfNumbers of cpfNumber){
            cpfArray.push(CpfNumbers * CpfIndex--);
        }

        this.CpfTotal = cpfArray.reduce((acumulator, value) => {
            return acumulator += value;
        }, 0)

        let CpfCaculate = (11 - (this.CpfTotal % 11));
        CpfCaculate > 9 ? CpfCaculate = 0 : CpfCaculate;
        cpfArray.length > 9 ? this.CpfValue(CpfCaculate) : this.CpfCheckPartOne('', CpfCaculate);
    }
}

const CpfVl = new CpfOptions();
     

                                    /*_______________________________*/         


CpfInputValidate.addEventListener('click', ()=> {
    if(CpfInputGenerate.value === '' || CpfInputGenerate.value.length < 14){
        return
    } else {
        CpfVl.CpfCheckPartOne(CpfInputGenerate.value.replace(/[\.-]/g, ''));
    }
})

CpfInputGenerate.addEventListener('input', ()=> {
    CpfInputGenerate.value = (CpfFormatter('', CpfInputGenerate.value));
    
    if((CpfFormatter('', CpfInputGenerate.value)).length < 14) {
        IconIncomplete.setAttribute('class', 'IconIncomplete');
        IconFalse.setAttribute('class', 'cpf-icon-false');
        IconTrue.setAttribute('class', 'cpf-icon-valid');
    } else {
        IconIncomplete.setAttribute('class', 'cpf-text-incomplete');
    }
})  

BntGenerate.addEventListener('click', ()=> {
    ValueRecived = true;
    CpfVl.CPFGenerate();
});
