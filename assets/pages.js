document.querySelectorAll('.inquiry-form:not(#trainingForm)').forEach(form=>form.addEventListener('submit',e=>{
 e.preventDefault();
 const data=new FormData(form);
 const lang=localStorage.getItem('boukili-language')||'ar';
 const isQuote=form.id==='quoteForm';
 const labels=lang==='fr'
  ? {name:'Nom complet',salon:'Nom du salon',phone:'Téléphone',city:'Ville',items:'Produits et quantités demandés',notes:'Notes supplémentaires',email:'E-mail',subject:'Sujet',message:'Message'}
  : {name:'الاسم الكامل',salon:'اسم الصالون',phone:'رقم الهاتف',city:'المدينة',items:'المنتجات والكميات المطلوبة',notes:'ملاحظات إضافية',email:'البريد الإلكتروني',subject:'الموضوع',message:'الرسالة'};
 const heading=lang==='fr'
  ? (isQuote?'Demande de devis professionnel — BOUKILI':'Message de contact — BOUKILI')
  : (isQuote?'طلب عرض سعر مهني — BOUKILI':'رسالة تواصل — BOUKILI');
 const rows=[];
 for(const [key,value] of data.entries()){
  const val=String(value).trim();
  if(val) rows.push((labels[key]||key)+': '+val);
 }
 const message=heading+'\\n\\n'+rows.join('\\n')+'\\n\\nBOUKILI — Distribution professionnelle IALM';
 const url='https://wa.me/212762486632?text='+encodeURIComponent(message);
 const hint=form.querySelector('#formHint')||document.getElementById('formHint');
 if(hint) hint.textContent=lang==='fr'?'Ouverture de WhatsApp… Confirmez ensuite l’envoi de votre demande.':'غادي يتحل واتساب دابا برسالة طلبك. ضغط على إرسال باش توصلنا.';
 window.location.href=url;
}));
document.getElementById('trainingForm')?.addEventListener('submit',e=>{
 e.preventDefault();
 const form=e.currentTarget;
 const data=new FormData(form);
 const rows=[];
 for(const [key,value] of data.entries()){
  if(String(value).trim()) rows.push(key+': '+String(value).trim());
 }
 const lang=localStorage.getItem('boukili-language')||'ar';
 const tr=value=>window.BOUKILI_TRANSLATE?window.BOUKILI_TRANSLATE(value):value;
 const message=(lang==='fr'?'Inscription à la formation gratuite — BOUKILI':'طلب التسجيل في الدورة التكوينية المجانية — BOUKILI')+'\n\n'+rows.map(line=>line.split(':').map(part=>tr(part)).join(': ')).join('\n');
 const url='https://wa.me/212762486632?text='+encodeURIComponent(message);
 const hint=document.getElementById('formHint');
 if(hint) hint.textContent='غادي نوجهوك دابا إلى WhatsApp لإرسال طلب التسجيل.';
 window.location.href=url;
});
