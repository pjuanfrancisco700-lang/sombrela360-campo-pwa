(() => {
  "use strict";

  const CONFIG = window.SOMBRELA_CONFIG || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const ICONS = {
    home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/></svg>',
    sales:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-7"/><path d="M22 19H2"/></svg>',
    receipt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>',
    user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4 3.2-6 8-6s7.3 2 8 6"/></svg>',
    plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>',
    close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    chevron:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 18 6-6-6-6"/></svg>',
    back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 18-6-6 6-6"/></svg>',
    snow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2v20M4.2 6.5l15.6 11M19.8 6.5l-15.6 11M8.5 4 12 6l3.5-2M8.5 20 12 18l3.5 2M3.5 10l3 2-3 2M20.5 10l-3 2 3 2"/></svg>',
    box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m4 7 8-4 8 4-8 4-8-4Z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/></svg>',
    wallet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h14a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h12"/><path d="M15 11h7v4h-7a2 2 0 1 1 0-4Z"/></svg>',
    users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="8" r="3"/><path d="M3 19c.5-3.3 2.5-5 6-5s5.5 1.7 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14c3.2-.3 5 1.2 5.5 4"/></svg>',
    info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></svg>',
    logout:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 5H4v14h6M14 8l4 4-4 4M8 12h10"/></svg>',
    edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m4 20 4.5-1 10-10-3.5-3.5-10 10L4 20Z"/><path d="m13.8 6.7 3.5 3.5"/></svg>',
    trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/></svg>',
    history:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></svg>',
    calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m5 12 4 4L19 6"/></svg>',
    warning:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 9v5M12 17h.01"/></svg>',
    refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36L21 8"/><path d="M21 3v5h-5"/></svg>',
    eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></svg>',
    save:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 3h12l2 2v16H5V3Z"/><path d="M8 3v6h8V3M8 21v-7h8v7"/></svg>'
  };
  const icon = (name, size = 20) => (ICONS[name] || ICONS.info).replace('<svg ', `<svg width="${size}" height="${size}" `);

  const esc = (v='') => String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const money = v => new Intl.NumberFormat('es-GT',{style:'currency',currency:'GTQ',minimumFractionDigits:2}).format(Number(v||0)).replace('GTQ','Q');
  const pct = v => `${Math.max(0,Math.min(999,Number(v||0))).toFixed(0)}%`;
  const normalize = s => String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const clamp = (n,min,max)=>Math.min(max,Math.max(min,n));
  const todayISO = () => new Date().toISOString().slice(0,10);
  const nowTime = () => new Date().toTimeString().slice(0,5);
  const uid = prefix => `${prefix}-${Date.now().toString(36).slice(-5).toUpperCase()}${Math.random().toString(36).slice(2,4).toUpperCase()}`;
  const saleOperationId = () => {
    let raw = '';
    if(window.crypto && typeof window.crypto.randomUUID === 'function'){
      raw = window.crypto.randomUUID();
    }else if(window.crypto && typeof window.crypto.getRandomValues === 'function'){
      const bytes = new Uint8Array(16);
      window.crypto.getRandomValues(bytes);
      raw = [...bytes].map(b=>b.toString(16).padStart(2,'0')).join('');
    }else{
      raw = `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
    }
    return `VEN-${raw.replace(/[^a-zA-Z0-9]/g,'').toUpperCase()}`;
  };
  const ncOperationId = () => {
    let raw = '';
    if(window.crypto && typeof window.crypto.randomUUID === 'function'){
      raw = window.crypto.randomUUID();
    }else if(window.crypto && typeof window.crypto.getRandomValues === 'function'){
      const bytes = new Uint8Array(16);
      window.crypto.getRandomValues(bytes);
      raw = [...bytes].map(b=>b.toString(16).padStart(2,'0')).join('');
    }else{
      raw = `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
    }
    return `NC-${raw.replace(/[^a-zA-Z0-9]/g,'').toUpperCase()}`;
  };
  const dateLabel = iso => {
    if(!iso) return '';
    const [y,m,d]=String(iso).slice(0,10).split('-').map(Number);
    return new Intl.DateTimeFormat('es-GT',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(y,m-1,d));
  };
  const timeLabel = value => {
    if(!value) return '';
    const raw=String(value).trim();
    let hours=null, minutes=null;
    const simple=raw.match(/^(\d{1,2}):(\d{2})(?::\d{2})?/);
    if(simple){
      hours=Number(simple[1]);
      minutes=Number(simple[2]);
    }else{
      const parsed=new Date(raw);
      if(!Number.isNaN(parsed.getTime())){
        hours=parsed.getHours();
        minutes=parsed.getMinutes();
      }
    }
    if(!Number.isFinite(hours)||!Number.isFinite(minutes)||hours<0||hours>23||minutes<0||minutes>59) return raw;
    return new Intl.DateTimeFormat('es-GT',{hour:'numeric',minute:'2-digit',hour12:true}).format(new Date(2000,0,1,hours,minutes));
  };
  const monthLabel = ym => {
    const [y,m]=String(ym||'').split('-').map(Number);
    if(!y||!m) return String(ym||'');
    const label=new Intl.DateTimeFormat('es-GT',{month:'long',year:'numeric'}).format(new Date(y,m-1,1));
    return label.charAt(0).toUpperCase()+label.slice(1);
  };
  const monthName = (m) => ['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][Number(m)] || '';

  function createDemoDB(){
    const year=2026, month=8;
    const days=[];
    for(let d=1;d<=31;d++){
      const dt=new Date(year,month-1,d);
      if(dt.getDay()!==0){
        days.push({ID_DIA_VENTA:`DV-${d}`,ID_PERIODO:'PER-2026-08-17029',ID_USUARIO:'USR-A82F',RUTA:'17029',ID_AGENCIA:'AG-01',AGENCIA:'Guastatoya',FECHA:`2026-08-${String(d).padStart(2,'0')}`,MES:8,ANIO:2026,DIA_PROGRAMADO:d<=27?'SI':'NO',DIA_TRABAJADO:d<=21?'SI':'NO'});
      }
    }
    return {
      agencias:[
        {ID_AGENCIA:'AG-01',AGENCIA:'Guastatoya',ESTADO:'ACTIVO'},
        {ID_AGENCIA:'AG-02',AGENCIA:'Sanarate',ESTADO:'ACTIVO'}
      ],
      usuarios:[
        {ID_USUARIO:'USR-A82F',NOMBRE:'Sergio',APELLIDO:'Pascual',RUTA:'17029',ID_AGENCIA:'AG-01',AGENCIA:'Guastatoya',CONTRASENA:'1234',ROL:'VENDEDOR',FECHA_CREACION:'2026-08-01',ESTADO:'ACTIVO'}
      ],
      clientes:[
        {ID_CLIENTE:'CLI-7D21',ID_USUARIO:'USR-A82F',RUTA:'17029',ID_AGENCIA:'AG-01',NOMBRE_NEGOCIO:'Caseta Azul',CATEGORIA:'Con congelador',DIRECCION:'Ixcanal',REFERENCIA:'Frente al campo',ESTADO:'ACTIVO'},
        {ID_CLIENTE:'CLI-9F12',ID_USUARIO:'USR-A82F',RUTA:'17029',ID_AGENCIA:'AG-01',NOMBRE_NEGOCIO:'Tiendita Rosita',CATEGORIA:'Con congelador',DIRECCION:'Aldea El Jícaro',REFERENCIA:'Casa esquina',ESTADO:'ACTIVO'},
        {ID_CLIENTE:'CLI-3A71',ID_USUARIO:'USR-A82F',RUTA:'17029',ID_AGENCIA:'AG-01',NOMBRE_NEGOCIO:'Tienda Esquipulas',CATEGORIA:'Con congelador',DIRECCION:'Esquipulas',REFERENCIA:'Parque central',ESTADO:'ACTIVO'},
        {ID_CLIENTE:'CLI-1B55',ID_USUARIO:'USR-A82F',RUTA:'17029',ID_AGENCIA:'AG-01',NOMBRE_NEGOCIO:'Abarrotería Don Chepe',CATEGORIA:'Sin congelador',DIRECCION:'Guastatoya zona 1',REFERENCIA:'A la par de farmacia',ESTADO:'ACTIVO'},
        {ID_CLIENTE:'CLI-2C44',ID_USUARIO:'USR-A82F',RUTA:'17029',ID_AGENCIA:'AG-01',NOMBRE_NEGOCIO:'Mini Súper La Terminal',CATEGORIA:'Sin congelador',DIRECCION:'Terminal de buses',REFERENCIA:'Local 12',ESTADO:'ACTIVO'},
        {ID_CLIENTE:'CLI-4D80',ID_USUARIO:'USR-A82F',RUTA:'17029',ID_AGENCIA:'AG-01',NOMBRE_NEGOCIO:'Tienda La Bendición',CATEGORIA:'Sin congelador',DIRECCION:'Barrio El Calvario',REFERENCIA:'Portón verde',ESTADO:'ACTIVO'}
      ],
      periodos:[{ID_PERIODO:'PER-2026-08-17029',ID_USUARIO:'USR-A82F',RUTA:'17029',ID_AGENCIA:'AG-01',AGENCIA:'Guastatoya',MES:8,ANIO:2026,PRESUPUESTO_CONGELADOR:5000,PRESUPUESTO_SIN_CONGELADOR:715,PRESUPUESTO_GENERAL:5000,FECHA_INICIO:'2026-08-01',FECHA_CIERRE:'',ESTADO:'ACTIVO',ORIGEN_MODIFICACION:'SUPERVISOR',MODIFICADO_POR:'SUPERVISOR'}],
      dias: days,
      ventas:[
        {ID_VENTA:'VEN-001',ID_PERIODO:'PER-2026-08-17029',ID_USUARIO:'USR-A82F',RUTA:'17029',ID_CLIENTE:'CLI-7D21',CATEGORIA:'Con congelador',MONTO:900,FECHA:'2026-08-04',HORA:'09:15',ESTADO:'ACTIVO'},
        {ID_VENTA:'VEN-002',ID_PERIODO:'PER-2026-08-17029',ID_USUARIO:'USR-A82F',RUTA:'17029',ID_CLIENTE:'CLI-9F12',CATEGORIA:'Con congelador',MONTO:1250,FECHA:'2026-08-08',HORA:'10:32',ESTADO:'ACTIVO'},
        {ID_VENTA:'VEN-003',ID_PERIODO:'PER-2026-08-17029',ID_USUARIO:'USR-A82F',RUTA:'17029',ID_CLIENTE:'CLI-3A71',CATEGORIA:'Con congelador',MONTO:1050,FECHA:'2026-08-14',HORA:'12:05',ESTADO:'ACTIVO'},
        {ID_VENTA:'VEN-004',ID_PERIODO:'PER-2026-08-17029',ID_USUARIO:'USR-A82F',RUTA:'17029',ID_CLIENTE:'CLI-1B55',CATEGORIA:'Sin congelador',MONTO:214.75,FECHA:'2026-08-17',HORA:'14:22',ESTADO:'ACTIVO'},
        {ID_VENTA:'VEN-005',ID_PERIODO:'PER-2026-08-17029',ID_USUARIO:'USR-A82F',RUTA:'17029',ID_CLIENTE:'CLI-2C44',CATEGORIA:'Sin congelador',MONTO:300,FECHA:'2026-08-20',HORA:'11:10',ESTADO:'ACTIVO'}
      ],
      canales:[{ID_CANAL:'CNL-MAR',NOMBRE_CANAL:'MARAVILLA',ESTADO:'ACTIVO'},{ID_CANAL:'CNL-S24',NOMBRE_CANAL:'SUPER 24',ESTADO:'ACTIVO'}],
      motivos:[
        {ID_MOTIVO:'MOT-MAR-ENE',CANAL:'MARAVILLA',MOTIVO:'Falta de energía eléctrica',PORCENTAJE_APLICACION:.5,ESTADO:'ACTIVO'},
        {ID_MOTIVO:'MOT-MAR-CON',CANAL:'MARAVILLA',MOTIVO:'Falla del congelador',PORCENTAJE_APLICACION:1,ESTADO:'ACTIVO'},
        {ID_MOTIVO:'MOT-S24-ENE',CANAL:'SUPER 24',MOTIVO:'Falta de energía eléctrica',PORCENTAJE_APLICACION:1,ESTADO:'ACTIVO'},
        {ID_MOTIVO:'MOT-S24-CON',CANAL:'SUPER 24',MOTIVO:'Falla del congelador',PORCENTAJE_APLICACION:1,ESTADO:'ACTIVO'}
      ],
      productos:[
        {ID_PRODUCTO:'PROD-001',CODIGO:'1001',PRODUCTO:'Sombrela Fresa',REFERENCIAS_BUSQUEDA:'fresa helado sombrela',ESTADO:'ACTIVO'},
        {ID_PRODUCTO:'PROD-002',CODIGO:'1002',PRODUCTO:'Sombrela Chocolate',REFERENCIAS_BUSQUEDA:'chocolate choco sombrela',ESTADO:'ACTIVO'},
        {ID_PRODUCTO:'PROD-003',CODIGO:'1003',PRODUCTO:'Sombrela Vainilla',REFERENCIAS_BUSQUEDA:'vainilla sombrela',ESTADO:'ACTIVO'},
        {ID_PRODUCTO:'PROD-004',CODIGO:'1004',PRODUCTO:'Sombrela Fresa Litro',REFERENCIAS_BUSQUEDA:'litro fresa',ESTADO:'ACTIVO'},
        {ID_PRODUCTO:'PROD-005',CODIGO:'1005',PRODUCTO:'Sombrela Chocolate Litro',REFERENCIAS_BUSQUEDA:'litro chocolate',ESTADO:'ACTIVO'},
        {ID_PRODUCTO:'PROD-006',CODIGO:'1006',PRODUCTO:'Sándwich Sombrela',REFERENCIAS_BUSQUEDA:'sandwich',ESTADO:'ACTIVO'}
      ],
      precios:[],
      nc:[], detalleNC:[]
    };
  }
  const demo = createDemoDB();
  demo.productos.forEach((p,i)=>{
    demo.precios.push({ID_PRECIO:`PM-${i}`,ID_PRODUCTO:p.ID_PRODUCTO,CANAL:'MARAVILLA',PRECIO:[6,6.5,6,22,22,8][i],ESTADO:'ACTIVO'});
    demo.precios.push({ID_PRECIO:`PS-${i}`,ID_PRODUCTO:p.ID_PRODUCTO,CANAL:'SUPER 24',PRECIO:[6.5,7,6.5,23,23,8.5][i],ESTADO:'ACTIVO'});
  });

  const state = {
    session: JSON.parse(localStorage.getItem('s360_session') || 'null'),
    user:null,
    data:null,
    view:'inicio',
    salesCategory:'Con congelador',
    salesSearch:'',
    historySearch:'',
    historyType:'TODOS',
    historyMonth:'TODOS',
    ncDraft:{channel:'',motiveId:'',items:{},catalog:[],editId:null,clientId:'',operationId:''},
    budgetDates:new Set(),
    newPeriodDates:new Set(),
    appliedSaleIds:new Set(),
    bootstrapAt:0,
  };


  // ---------- PENDING SALES / BACKGROUND SYNC ----------
  // Las ventas se guardan primero en el dispositivo y luego se sincronizan
  // automáticamente con Google Sheets usando el mismo ID_VENTA.
  // El backend ya es idempotente: si el mismo saleId llega de nuevo,
  // devuelve la venta existente en lugar de duplicarla.
  const PENDING_SALES_KEY = 's360_pending_sales_v1';
  let pendingSalesSyncPromise = null;

  function readPendingSales(){
    try{
      const raw=JSON.parse(localStorage.getItem(PENDING_SALES_KEY)||'[]');
      return Array.isArray(raw)?raw:[];
    }catch{
      return [];
    }
  }

  function writePendingSales(items){
    try{
      localStorage.setItem(PENDING_SALES_KEY,JSON.stringify(items));
    }catch{
      throw new Error('No fue posible guardar la venta en el dispositivo. Libera espacio e intenta nuevamente.');
    }
  }

  function pendingSalesForRoute(route){
    route=String(route||'');
    if(!route) return [];
    return readPendingSales()
      .filter(item=>String(item.route||'')===route)
      .sort((a,b)=>Number(a.createdAt||0)-Number(b.createdAt||0));
  }

  function pendingSalesForCurrentUser(){
    return pendingSalesForRoute(state.user?.RUTA);
  }

  function pendingSalesCount(){
    return pendingSalesForCurrentUser().length;
  }

  function enqueuePendingSale(payload,client){
    const route=String(state.user?.RUTA||'');
    if(!route) throw new Error('Sesión no válida.');

    const item={
      saleId:String(payload.saleId||'').trim()||saleOperationId(),
      clientId:String(payload.clientId||'').trim(),
      amount:Number(payload.amount),
      route,
      userId:String(state.user?.ID_USUARIO||''),
      clientName:String(client?.NOMBRE_NEGOCIO||''),
      category:String(client?.CATEGORIA||''),
      createdAt:Date.now(),
      attempts:0,
      lastAttemptAt:0,
      lastError:'',
      status:'pending'
    };

    if(!item.clientId) throw new Error('Cliente no válido.');
    if(!(item.amount>0)) throw new Error('Monto no válido.');

    const all=readPendingSales();
    const existingIndex=all.findIndex(x=>String(x.saleId)===item.saleId);

    if(existingIndex>=0){
      item.createdAt=Number(all[existingIndex].createdAt||item.createdAt);
      item.attempts=Number(all[existingIndex].attempts||0);
      all[existingIndex]={...all[existingIndex],...item};
    }else{
      all.push(item);
    }

    writePendingSales(all);
    return item;
  }

  function patchPendingSale(saleId,patch){
    const all=readPendingSales();
    const idx=all.findIndex(x=>String(x.saleId)===String(saleId));
    if(idx<0) return;
    all[idx]={...all[idx],...patch};
    writePendingSales(all);
  }

  function removePendingSale(saleId){
    const all=readPendingSales();
    const next=all.filter(x=>String(x.saleId)!==String(saleId));
    if(next.length!==all.length) writePendingSales(next);
  }

  function pendingSalesStatusHTML(){
    const count=pendingSalesCount();
    if(!count) return '';

    const syncing=Boolean(pendingSalesSyncPromise);
    const offline=typeof navigator!=='undefined' && navigator.onLine===false;
    const plural=count===1?'venta':'ventas';
    const stateText=offline
      ? `${count} ${plural} guardada${count===1?'':'s'} en el dispositivo`
      : syncing
        ? `${count} ${plural} sincronizando...`
        : `${count} ${plural} pendiente${count===1?'':'s'} de sincronizar`;

    return `<div class="smart-message" style="margin:0 0 12px">
      <span class="smart-dot" style="background:${offline?'var(--amber)':'var(--blue)'}"></span>
      <span>${stateText}</span>
      <button class="btn-link tiny" data-action="sync-pending-sales" ${syncing?'disabled':''} style="margin-left:auto">
        ${syncing?'ENVIANDO...':'SINCRONIZAR'}
      </button>
    </div>`;
  }

  async function reconcileDashboardAfterDuplicate(expectedRoute,expectedToken){
    if(!expectedRoute||!expectedToken) return;
    if(String(state.user?.RUTA||'')!==String(expectedRoute)) return;
    if(String(state.session?.token||'')!==String(expectedToken)) return;

    const data=await api.request('bootstrap',{});

    // La sesión podría haber cambiado mientras esperábamos la respuesta.
    if(String(state.user?.RUTA||'')!==String(expectedRoute)) return;
    if(String(state.session?.token||'')!==String(expectedToken)) return;
    if(String(data.user?.RUTA||'')!==String(expectedRoute)) return;

    state.data=data;
    state.user=data.user;
    state.bootstrapAt=Date.now();
    state.budgetDates=new Set(
      (data.days||[])
        .filter(d=>d.DIA_PROGRAMADO==='SI')
        .map(d=>String(d.FECHA).slice(0,10))
    );
  }

  function syncPendingSales({notify=false}={}){
    if(pendingSalesSyncPromise) return pendingSalesSyncPromise;

    pendingSalesSyncPromise=(async()=>{
      let synced=0;
      let failure=null;
      let needsReconcile=false;

      if(!state.session?.token||!state.user){
        return {synced:0,remaining:pendingSalesCount(),failure:null};
      }

      // Congelamos la identidad de la sesión durante este ciclo.
      // Si el usuario cierra sesión o entra con otra ruta mientras una petición
      // está en curso, nunca aplicamos esa venta al dashboard de la nueva ruta.
      const syncRoute=String(state.user.RUTA||'');
      const syncToken=String(state.session.token||'');

      if(typeof navigator!=='undefined' && navigator.onLine===false){
        if(notify) toast('Sin conexión. Las ventas pendientes siguen guardadas en el dispositivo.','error');
        return {synced:0,remaining:pendingSalesForRoute(syncRoute).length,failure:null};
      }

      while(true){
        if(String(state.user?.RUTA||'')!==syncRoute) break;
        if(String(state.session?.token||'')!==syncToken) break;

        const item=pendingSalesForRoute(syncRoute)[0];
        if(!item) break;

        const attempts=Number(item.attempts||0)+1;
        try{
          patchPendingSale(item.saleId,{
            status:'syncing',
            attempts,
            lastAttemptAt:Date.now(),
            lastError:''
          });
        }catch{}

        try{
          const res=await api.request('registerSale',{
            saleId:item.saleId,
            clientId:item.clientId,
            amount:item.amount
          });

          removePendingSale(item.saleId);
          synced++;

          if(res?.sale){
            const sameSession=
              String(state.user?.RUTA||'')===syncRoute &&
              String(state.session?.token||'')===syncToken;

            if(sameSession){
              // Si la venta ya existía y el dashboard fue cargado después de
              // crear la pendiente, no sabemos si ya estaba incluida.
              // En ese caso reconciliamos con el servidor para evitar sumar dos veces.
              if(res.duplicate===true && Number(item.createdAt||0)<=Number(state.bootstrapAt||0)){
                needsReconcile=true;
              }else{
                applyRegisteredSaleToDashboard(res.sale);
              }
            }
          }
        }catch(err){
          failure=err;
          try{
            patchPendingSale(item.saleId,{
              status:'pending',
              lastError:String(err?.message||err||'Error de sincronización'),
              lastAttemptAt:Date.now(),
              attempts
            });
          }catch{}
          break;
        }
      }

      if(needsReconcile){
        try{
          await reconcileDashboardAfterDuplicate(syncRoute,syncToken);
        }catch{
          // La venta ya está protegida por ID en el backend.
          // Si no se puede reconciliar ahora, el próximo bootstrap la corregirá.
        }
      }

      if(state.data){
        if(state.view==='ventas') renderSales();
        else if(state.view==='inicio') renderDashboard();
      }

      const remaining=pendingSalesForRoute(syncRoute).length;

      if(notify){
        if(failure){
          toast('La venta sigue guardada. No se pudo sincronizar todavía.','error');
        }else if(synced>0){
          toast(`${synced} ${synced===1?'venta sincronizada':'ventas sincronizadas'}`,'success');
        }else if(!remaining){
          toast('No hay ventas pendientes','success');
        }
      }

      return {synced,remaining,failure};
    })().finally(()=>{
      pendingSalesSyncPromise=null;
      if(state.data && state.view==='ventas') renderSales();
    });

    return pendingSalesSyncPromise;
  }

  const api = {
    isDemo(){ return CONFIG.DEMO_MODE || !CONFIG.API_URL; },
    async request(action,payload={}){
      if(this.isDemo()) return demoRequest(action,payload);
      const controller = new AbortController();
      const timer=setTimeout(()=>controller.abort(),CONFIG.REQUEST_TIMEOUT_MS||18000);
      try{
        const body=new URLSearchParams();
        body.set('action',action);
        body.set('payload',JSON.stringify({...payload,token:state.session?.token||payload.token||''}));
        const res=await fetch(CONFIG.API_URL,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body,signal:controller.signal,redirect:'follow'});
        const text=await res.text();
        let json;
        try{ json=JSON.parse(text); }catch{ throw new Error('Respuesta inválida del servidor'); }
        if(!json.ok) throw new Error(json.error||'No se pudo completar la operación');
        return json.data;
      }catch(err){
        if(err.name==='AbortError') throw new Error('La operación tardó demasiado. Intenta de nuevo.');
        throw err;
      }finally{ clearTimeout(timer); }
    }
  };

  function demoUserFromToken(token){
    return demo.usuarios.find(u=>`demo-${u.ID_USUARIO}`===token) || null;
  }
  function demoCurrentUser(payload={}){
    const token=payload.token || state.session?.token;
    const u=demoUserFromToken(token);
    if(!u) throw new Error('Sesión no válida');
    return u;
  }
  function dashboardFor(user){
    const period=demo.periodos.find(p=>p.RUTA===user.RUTA && p.ESTADO==='ACTIVO') || null;
    const sales=period ? demo.ventas.filter(v=>v.ID_PERIODO===period.ID_PERIODO && v.ESTADO==='ACTIVO') : [];
    const sum=cat=>sales.filter(v=>!cat||v.CATEGORIA===cat).reduce((a,v)=>a+Number(v.MONTO||0),0);
    const total=sum(), con=sum('Con congelador'), sin=sum('Sin congelador');
    const programmed=period ? demo.dias.filter(d=>d.ID_PERIODO===period.ID_PERIODO&&d.DIA_PROGRAMADO==='SI').length : 0;
    const worked=period ? demo.dias.filter(d=>d.ID_PERIODO===period.ID_PERIODO&&d.DIA_TRABAJADO==='SI').length : 0;
    const project=v=>worked? v/worked*programmed:0;
    const countClients=cat=>demo.clientes.filter(c=>c.RUTA===user.RUTA&&c.ESTADO==='ACTIVO'&&c.CATEGORIA===cat).length;
    return {
      period,
      general:{budget:Number(period?.PRESUPUESTO_GENERAL||0),sold:total,missing:Math.max(Number(period?.PRESUPUESTO_GENERAL||0)-total,0),percent:period?.PRESUPUESTO_GENERAL?total/period.PRESUPUESTO_GENERAL*100:0,projection:project(total)},
      con:{clients:countClients('Con congelador'),budget:Number(period?.PRESUPUESTO_CONGELADOR||0),sold:con,missing:Math.max(Number(period?.PRESUPUESTO_CONGELADOR||0)-con,0),percent:period?.PRESUPUESTO_CONGELADOR?con/period.PRESUPUESTO_CONGELADOR*100:0,projection:project(con)},
      sin:{clients:countClients('Sin congelador'),budget:Number(period?.PRESUPUESTO_SIN_CONGELADOR||0),sold:sin,missing:Math.max(Number(period?.PRESUPUESTO_SIN_CONGELADOR||0)-sin,0),percent:period?.PRESUPUESTO_SIN_CONGELADOR?sin/period.PRESUPUESTO_SIN_CONGELADOR*100:0,projection:project(sin)},
      days:{programmed,worked}
    };
  }
  function bootstrapFor(user){
    const dash=dashboardFor(user);
    return {
      user:{...user,CONTRASENA:undefined},
      dashboard:dash,
      period:dash.period,
      days:dash.period ? demo.dias.filter(d=>d.ID_PERIODO===dash.period.ID_PERIODO) : [],
      clients:demo.clientes.filter(c=>c.RUTA===user.RUTA&&c.ESTADO==='ACTIVO').map(c=>({...c})),
      channels:demo.canales.filter(c=>c.ESTADO==='ACTIVO'),
      motives:demo.motivos.filter(m=>m.ESTADO==='ACTIVO')
    };
  }

  async function demoRequest(action,p={}){
    await new Promise(r=>setTimeout(r, action==='bootstrap'?650:160));
    switch(action){
      case 'getAgencies': return demo.agencias.filter(a=>a.ESTADO==='ACTIVO');
      case 'login': {
        const u=demo.usuarios.find(x=>x.RUTA===String(p.route).trim()&&String(x.CONTRASENA)===String(p.password)&&x.ESTADO==='ACTIVO');
        if(!u) throw new Error('Usuario o contraseña incorrectos');
        return {
          token:`demo-${u.ID_USUARIO}`,
          user:{...u,CONTRASENA:undefined},
          data:bootstrapFor(u)
        };
      }
      case 'createUser': {
        if(demo.usuarios.some(u=>u.RUTA===String(p.route).trim())) throw new Error('La ruta ya está registrada');
        const ag=demo.agencias.find(a=>a.ID_AGENCIA===p.agencyId||a.AGENCIA===p.agency);
        if(!ag) throw new Error('Agencia no válida');
        const u={ID_USUARIO:uid('USR'),NOMBRE:p.name,APELLIDO:p.lastName,RUTA:String(p.route).trim(),ID_AGENCIA:ag.ID_AGENCIA,AGENCIA:ag.AGENCIA,CONTRASENA:String(Math.floor(100000+Math.random()*900000)),ROL:'VENDEDOR',FECHA_CREACION:todayISO(),ESTADO:'ACTIVO'};
        demo.usuarios.push(u);
        return {name:u.NOMBRE};
      }
      case 'bootstrap': return bootstrapFor(demoCurrentUser(p));
      case 'getNcCatalog': {
        demoCurrentUser(p);
        return demo.productos.filter(x=>x.ESTADO==='ACTIVO').map(prod=>{
          const pr=demo.precios.find(x=>x.ID_PRODUCTO===prod.ID_PRODUCTO&&x.CANAL===p.channel&&x.ESTADO==='ACTIVO');
          return pr ? {...prod,PRECIO:Number(pr.PRECIO)} : null;
        }).filter(Boolean);
      }
      case 'createClient': {
        const u=demoCurrentUser(p);
        if(!['Con congelador','Sin congelador'].includes(p.category)) throw new Error('Categoría no válida');
        const c={ID_CLIENTE:uid('CLI'),ID_USUARIO:u.ID_USUARIO,RUTA:u.RUTA,ID_AGENCIA:u.ID_AGENCIA,NOMBRE_NEGOCIO:p.business.trim(),CATEGORIA:p.category,DIRECCION:p.address?.trim()||'',REFERENCIA:p.reference?.trim()||'',FECHA_CREACION:todayISO(),ESTADO:'ACTIVO'};
        demo.clientes.push(c); return c;
      }
      case 'updateClient': {
        const u=demoCurrentUser(p); const c=demo.clientes.find(c=>c.ID_CLIENTE===p.clientId&&c.RUTA===u.RUTA);
        if(!c) throw new Error('Cliente no encontrado');
        Object.assign(c,{NOMBRE_NEGOCIO:p.business,CATEGORIA:p.category,DIRECCION:p.address||'',REFERENCIA:p.reference||''}); return c;
      }
      case 'deactivateClient': {
        const u=demoCurrentUser(p); const c=demo.clientes.find(c=>c.ID_CLIENTE===p.clientId&&c.RUTA===u.RUTA);
        if(!c) throw new Error('Cliente no encontrado'); c.ESTADO='INACTIVO'; return {id:c.ID_CLIENTE};
      }
      case 'registerSale': {
        const u=demoCurrentUser(p); const period=demo.periodos.find(x=>x.RUTA===u.RUTA&&x.ESTADO==='ACTIVO');
        if(!period) throw new Error('No hay un período activo');
        const c=demo.clientes.find(x=>x.ID_CLIENTE===p.clientId&&x.RUTA===u.RUTA&&x.ESTADO==='ACTIVO');
        if(!c) throw new Error('Cliente no válido');
        const amount=Number(p.amount); if(!(amount>0)) throw new Error('Monto no válido');
        const saleId=String(p.saleId||'').trim()||uid('VEN');
        const existing=demo.ventas.find(x=>x.ID_VENTA===saleId);
        if(existing){
          if(String(existing.RUTA)!==String(u.RUTA)) throw new Error('Identificador de venta no válido');
          return {sale:{...existing},duplicate:true};
        }
        const v={ID_VENTA:saleId,ID_PERIODO:period.ID_PERIODO,ID_USUARIO:u.ID_USUARIO,RUTA:u.RUTA,ID_CLIENTE:c.ID_CLIENTE,CATEGORIA:c.CATEGORIA,MONTO:amount,FECHA:todayISO(),HORA:nowTime(),ESTADO:'ACTIVO'};
        demo.ventas.push(v); return {sale:v,duplicate:false};
      }
      case 'updateSale': {
        const u=demoCurrentUser(p); const v=demo.ventas.find(x=>x.ID_VENTA===p.saleId&&x.RUTA===u.RUTA&&x.ESTADO==='ACTIVO');
        if(!v) throw new Error('Venta no encontrada'); const amount=Number(p.amount); if(!(amount>0)) throw new Error('Monto no válido'); v.MONTO=amount; return {sale:v,dashboard:dashboardFor(u)};
      }
      case 'cancelSale': {
        const u=demoCurrentUser(p); const v=demo.ventas.find(x=>x.ID_VENTA===p.saleId&&x.RUTA===u.RUTA); if(!v) throw new Error('Venta no encontrada'); v.ESTADO='ANULADO'; return {dashboard:dashboardFor(u)};
      }
      case 'history': {
        const u=demoCurrentUser(p);
        const clientMap=Object.fromEntries(demo.clientes.map(c=>[c.ID_CLIENTE,c]));
        const sales=demo.ventas.filter(v=>v.RUTA===u.RUTA&&v.ESTADO==='ACTIVO').map(v=>({kind:'VENTA',...v,CLIENTE:clientMap[v.ID_CLIENTE]?.NOMBRE_NEGOCIO||v.ID_CLIENTE}));
        const ncs=demo.nc.filter(n=>n.RUTA===u.RUTA&&n.ESTADO==='ACTIVO').map(n=>({kind:'NC',...n,CLIENTE:clientMap[n.ID_CLIENTE]?.NOMBRE_NEGOCIO||n.ID_CLIENTE}));
        return [...sales,...ncs].sort((a,b)=>`${b.FECHA} ${b.HORA}`.localeCompare(`${a.FECHA} ${a.HORA}`));
      }
      case 'getNCDetail': {
        const u=demoCurrentUser(p); const n=demo.nc.find(x=>x.ID_NC===p.ncId&&x.RUTA===u.RUTA&&x.ESTADO==='ACTIVO'); if(!n) throw new Error('NC no encontrada');
        return {...n,items:demo.detalleNC.filter(d=>d.ID_NC===n.ID_NC)};
      }
      case 'saveNC': return demoSaveNC(p,false);
      case 'updateNC': return demoSaveNC(p,true);
      case 'cancelNC': {
        const u=demoCurrentUser(p); const n=demo.nc.find(x=>x.ID_NC===p.ncId&&x.RUTA===u.RUTA); if(!n) throw new Error('NC no encontrada'); n.ESTADO='ANULADO'; return {dashboard:dashboardFor(u)};
      }
      case 'updatePeriod': return demoUpdatePeriod(p,false);
      case 'startNewPeriod': return demoUpdatePeriod(p,true);
      default: throw new Error(`Acción demo no implementada: ${action}`);
    }
  }

  function demoSaveNC(p,isEdit){
    const u=demoCurrentUser(p); const period=demo.periodos.find(x=>x.RUTA===u.RUTA&&x.ESTADO==='ACTIVO'); if(!period) throw new Error('No hay período activo');
    const client=demo.clientes.find(c=>c.ID_CLIENTE===p.clientId&&c.RUTA===u.RUTA&&c.CATEGORIA==='Con congelador'&&c.ESTADO==='ACTIVO'); if(!client) throw new Error('Cliente no válido para NC');
    const motive=demo.motivos.find(m=>m.ID_MOTIVO===p.motiveId&&m.CANAL===p.channel&&m.ESTADO==='ACTIVO'); if(!motive) throw new Error('Motivo no válido');
    const items=(p.items||[]).map(item=>{
      const prod=demo.productos.find(x=>x.ID_PRODUCTO===item.productId&&x.ESTADO==='ACTIVO');
      const pr=demo.precios.find(x=>x.ID_PRODUCTO===item.productId&&x.CANAL===p.channel&&x.ESTADO==='ACTIVO');
      const qty=Math.max(0,Math.floor(Number(item.quantity||0)));
      if(!prod||!pr||qty<1) return null;
      return {ID_PRODUCTO:prod.ID_PRODUCTO,PRODUCTO:prod.PRODUCTO,CANTIDAD:qty,PRECIO_UNITARIO:Number(pr.PRECIO),SUBTOTAL:qty*Number(pr.PRECIO)};
    }).filter(Boolean);
    if(!items.length) throw new Error('Agrega al menos un producto');
    const subtotal=items.reduce((a,x)=>a+x.SUBTOTAL,0), percentage=Number(motive.PORCENTAJE_APLICACION), total=subtotal*percentage;
    let n, duplicate=false;
    if(isEdit){
      n=demo.nc.find(x=>x.ID_NC===p.ncId&&x.RUTA===u.RUTA&&x.ESTADO==='ACTIVO');
      if(!n) throw new Error('NC no encontrada');
      demo.detalleNC=demo.detalleNC.filter(d=>d.ID_NC!==n.ID_NC);
    }else{
      const requestedId=String(p.ncId||'').trim()||uid('NC');
      n=demo.nc.find(x=>x.ID_NC===requestedId&&x.RUTA===u.RUTA);
      if(n){
        duplicate=true;
      }else{
        n={ID_NC:requestedId,ID_PERIODO:period.ID_PERIODO,ID_USUARIO:u.ID_USUARIO,RUTA:u.RUTA,ESTADO:'ACTIVO'};
        demo.nc.push(n);
      }
      if(duplicate){
        return {nc:n,dashboard:dashboardFor(u),duplicate:true};
      }
    }
    Object.assign(n,{ID_CLIENTE:client.ID_CLIENTE,CANAL:p.channel,MOTIVO:motive.MOTIVO,SUBTOTAL:subtotal,PORCENTAJE:percentage,TOTAL_NC:total,FECHA:n.FECHA||todayISO(),HORA:n.HORA||nowTime()});
    items.forEach(x=>demo.detalleNC.push({ID_DETALLE:uid('DNC'),ID_NC:n.ID_NC,...x}));
    return {nc:n,dashboard:dashboardFor(u),duplicate};
  }

  function demoUpdatePeriod(p,isNew){
    const u=demoCurrentUser(p);
    if(isNew){
      demo.periodos.filter(x=>x.RUTA===u.RUTA&&x.ESTADO==='ACTIVO').forEach(x=>{x.ESTADO='CERRADO';x.FECHA_CIERRE=todayISO();});
      const id=`PER-${p.year}-${String(p.month).padStart(2,'0')}-${u.RUTA}`;
      const per={ID_PERIODO:id,ID_USUARIO:u.ID_USUARIO,RUTA:u.RUTA,ID_AGENCIA:u.ID_AGENCIA,AGENCIA:u.AGENCIA,MES:Number(p.month),ANIO:Number(p.year),PRESUPUESTO_CONGELADOR:Number(p.budgetCon||0),PRESUPUESTO_SIN_CONGELADOR:Number(p.budgetSin||0),PRESUPUESTO_GENERAL:Number(p.budgetCon||0),FECHA_INICIO:`${p.year}-${String(p.month).padStart(2,'0')}-01`,FECHA_CIERRE:'',ESTADO:'ACTIVO',ORIGEN_MODIFICACION:'VENDEDOR',MODIFICADO_POR:`RUTA ${u.RUTA}`};
      demo.periodos.push(per); demo.dias=demo.dias.filter(d=>d.ID_PERIODO!==id);
      (p.dates||[]).forEach(date=>demo.dias.push({ID_DIA_VENTA:uid('DV'),ID_PERIODO:id,ID_USUARIO:u.ID_USUARIO,RUTA:u.RUTA,ID_AGENCIA:u.ID_AGENCIA,AGENCIA:u.AGENCIA,FECHA:date,MES:Number(p.month),ANIO:Number(p.year),DIA_PROGRAMADO:'SI',DIA_TRABAJADO:'NO'}));
    } else {
      const per=demo.periodos.find(x=>x.RUTA===u.RUTA&&x.ESTADO==='ACTIVO'); if(!per) throw new Error('No hay período activo');
      per.PRESUPUESTO_CONGELADOR=Number(p.budgetCon||0); per.PRESUPUESTO_SIN_CONGELADOR=Number(p.budgetSin||0); per.PRESUPUESTO_GENERAL=per.PRESUPUESTO_CONGELADOR; per.ORIGEN_MODIFICACION='VENDEDOR'; per.MODIFICADO_POR=`RUTA ${u.RUTA}`;
      const selected=new Set(p.dates||[]); demo.dias.filter(d=>d.ID_PERIODO===per.ID_PERIODO).forEach(d=>d.DIA_PROGRAMADO=selected.has(d.FECHA)?'SI':'NO');
      selected.forEach(date=>{ if(!demo.dias.some(d=>d.ID_PERIODO===per.ID_PERIODO&&d.FECHA===date)) demo.dias.push({ID_DIA_VENTA:uid('DV'),ID_PERIODO:per.ID_PERIODO,ID_USUARIO:u.ID_USUARIO,RUTA:u.RUTA,ID_AGENCIA:u.ID_AGENCIA,AGENCIA:u.AGENCIA,FECHA:date,MES:per.MES,ANIO:per.ANIO,DIA_PROGRAMADO:'SI',DIA_TRABAJADO:'NO'}); });
    }
    return bootstrapFor(u);
  }

  function clearLocalSession(){
    localStorage.removeItem('s360_session');
    state.session=null;
    state.user=null;
    state.data=null;
  }

  function saveLocalSession(token,expiresAt){
    state.session={
      token:String(token||''),
      expiresAt:Number(expiresAt||0)
    };
    localStorage.setItem('s360_session',JSON.stringify(state.session));
  }

  function updateLocalSessionExpiry(expiresAt){
    const expiry=Number(expiresAt||0);
    if(!state.session?.token||!expiry) return;

    state.session.expiresAt=expiry;
    localStorage.setItem('s360_session',JSON.stringify(state.session));
  }

  function localSessionExpired(){
    const expiry=Number(state.session?.expiresAt||0);
    return Boolean(expiry && Date.now()>=expiry);
  }

  function isSessionAuthError(err){
    const msg=String(err?.message||err||'').toLowerCase();
    return (
      msg.includes('sesión de 24 horas finalizó') ||
      msg.includes('sesión venció') ||
      msg.includes('sesión no válida') ||
      msg.includes('usuario no disponible')
    );
  }

  async function init(){
    if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
    document.addEventListener('click',handleClick);
    document.addEventListener('input',handleInput);
    document.addEventListener('change',handleChange);
    document.addEventListener('submit',handleSubmit);

    window.addEventListener('online',()=>{
      if(state.session?.token&&state.user) void syncPendingSales({notify:false});
    });

    document.addEventListener('visibilitychange',()=>{
      if(document.visibilityState==='visible'&&state.session?.token&&state.user){
        void syncPendingSales({notify:false});
      }
    });

    if(state.session?.token){
      // Si el teléfono ya conoce la expiración y pasaron las 24 horas,
      // ni siquiera hacemos una petición innecesaria.
      if(localSessionExpired()){
        clearLocalSession();
        renderLogin();
        return;
      }

      try{
        const loaded=await loadSession();
        if(loaded) return;
        return;
      }catch{
        // Un fallo de conexión NO borra la sesión.
        // El loader queda en modo error con opción REINTENTAR.
        return;
      }
    }

    renderLogin();
  }

  function renderLogin(){
    $('#app').innerHTML=`
      <section class="login-screen">
        <div class="login-wrap">
          <div class="brand-lockup">
            <div class="brand-logo"><img src="assets/icon-192.png" alt="Sombrela 360"></div>
            <h1>Sombrela 360</h1>
            <p>Control, seguimiento y claridad en cada venta.</p>
          </div>
          <form class="login-card" id="login-form">
            <div class="login-card-head">
              <h2>Iniciar sesión</h2>
              <button class="icon-btn" type="button" data-action="open-create-user" aria-label="Crear usuario" title="Crear usuario">${icon('user',21)}<span style="position:absolute;margin:18px 0 0 19px;background:#2563eb;color:#fff;border-radius:50%;width:14px;height:14px;font-size:12px;line-height:13px">+</span></button>
            </div>
            <div class="field"><label>Usuario</label><input name="route" inputmode="numeric" autocomplete="username" placeholder="Número de ruta" required></div>
            <div class="field"><label>Contraseña</label><input name="password" type="password" autocomplete="current-password" placeholder="••••••" required></div>
            <button class="btn btn-primary btn-block" type="submit">INICIAR SESIÓN</button>
            ${api.isDemo()?'<p class="small muted" style="text-align:center;margin:13px 0 0">Vista demo: ruta 17029 · contraseña 1234</p>':''}
          </form>
        </div>
      </section>`;
  }

  function applyBootstrapData(data){
    state.data=data;
    state.user=data.user;
    state.view='inicio';
    state.bootstrapAt=Date.now();

    if(data.sessionExpiresAt){
      updateLocalSessionExpiry(data.sessionExpiresAt);
    }

    state.budgetDates=new Set(
      (data.days||[])
        .filter(d=>d.DIA_PROGRAMADO==='SI')
        .map(d=>String(d.FECHA).slice(0,10))
    );
  }

  function finishInitialLoad(data){
    applyBootstrapData(data);
    renderShell();
    hideLoader();

    // No bloquea la entrada a la app. Si quedaron ventas pendientes,
    // se intentan enviar después de mostrar la interfaz.
    void syncPendingSales({notify:false});
  }

  async function loadSession(){
    showInitialLoader();

    try{
      const data=await api.request('bootstrap',{});
      finishInitialLoad(data);
      return true;
    }catch(err){
      if(isSessionAuthError(err)){
        clearLocalSession();
        hideLoader();
        renderLogin();
        toast('Tu sesión de 24 horas finalizó. Ingresa nuevamente.','error');
        return false;
      }

      // Antes este error podía dejar el loader cubriendo la pantalla aunque
      // la petición ya hubiera fallado. Ahora siempre cambia a estado recuperable.
      showInitialLoader(true);
      throw err;
    }
  }

  function showInitialLoader(error=false){
    const existing=$('.loading-screen'); if(existing) existing.remove();
    const div=document.createElement('div'); div.className=`loading-screen${error?' error-load':''}`;
    div.innerHTML=`<div>
      <div class="brand-logo"><img src="assets/icon-192.png" alt="Sombrela 360"></div>
      <div class="spinner"></div>
      <div class="load-error-icon">${icon('warning',22)}</div>
      <h2>${error?'No pudimos cargar la información.':'Cargando datos...'}</h2>
      <p>${error?'Verifica tu conexión e intenta nuevamente.':'Preparando tu información'}</p>
      ${error?'<button class="btn btn-primary" style="margin-top:18px" data-action="retry-load">REINTENTAR</button>':''}
    </div>`;
    document.body.appendChild(div);
  }
  function hideLoader(){ $('.loading-screen')?.remove(); }

  function renderShell(){
    $('#app').innerHTML=`
      <div class="app-shell">
        <main id="page"></main>
        <nav class="bottom-nav" aria-label="Navegación principal">
          ${navButton('inicio','home','INICIO')}
          ${navButton('ventas','sales','VENTAS')}
          ${navButton('nc','receipt','NC')}
          ${navButton('mas','menu','MÁS')}
        </nav>
      </div>`;
    navigate(state.view,false);
  }
  function navButton(view,ic,label){return `<button class="nav-btn ${state.view===view?'active':''}" data-view="${view}">${icon(ic,21)}<span>${label}</span></button>`;}

  function navigate(view,scroll=true){
    // Durante una actualización del Service Worker puede existir un instante
    // en el que llegue una navegación vieja antes de que #page esté montado.
    // En ese caso simplemente ignoramos la acción en vez de lanzar una pantalla roja.
    if(!$('#page')||!state.data||!state.user) return;

    state.view=view;
    $$('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===view || (view.startsWith('ventas')&&b.dataset.view==='ventas') || (view.startsWith('mas')&&b.dataset.view==='mas') || (view.startsWith('nc')&&b.dataset.view==='nc')));
    if(view==='inicio') renderDashboard();
    else if(view==='ventas') renderSales();
    else if(view==='ventas-history') renderHistory();
    else if(view==='nc') renderNC();
    else if(view==='mas') renderMore();
    else if(view==='mas-user') renderUser();
    else if(view==='mas-budget') renderBudget();
    else if(view==='mas-clients') renderClientBase();
    else if(view==='mas-about') renderAbout();
    const resetScroll = scroll || view === 'inicio';

if(resetScroll){
  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}
  }
  function titleForView(v){
    return ({inicio:'Inicio',ventas:'Ventas','ventas-history':'Historial',nc:'Nota de crédito',mas:'Más','mas-user':'Usuario','mas-budget':'Presupuesto','mas-clients':'Base de clientes','mas-about':'Sombrela 360'})[v]||'Sombrela 360';
  }

  function progressRing(value,color='var(--blue)'){
    const p=clamp(Number(value||0),0,100);
    return `<div class="progress-ring" style="--p:${p};--ring:${color}"><div class="ring-text">${pct(value)}<span>Avance</span></div></div>`;
  }
  function smartMessage(p){
    if(p>=100) return 'Objetivo alcanzado 🎉';
    if(p>=85) return 'Estás cerca de tu objetivo';
    if(p>=55) return 'Buen avance, sigue así';
    return 'Aún lejos, impulsa ventas';
  }
  function indicatorCard(kind,data){
    const con=kind==='con';
    return `<article class="card indicator-card">
      <div class="indicator-head">
        <div class="indicator-title">
          <span class="icon-badge ${con?'blue':'green'}">${icon(con?'snow':'box',20)}</span>
          <div><h3>${con?'Con congelador':'Sin congelador'}</h3><p>${data.clients||0} clientes</p></div>
        </div>
        <div class="big-number">${money(data.sold)}</div>
      </div>
      <div class="progress ${con?'':'green'}"><span style="width:${clamp(data.percent,0,100)}%"></span></div>
      <div class="indicator-meta"><span>${pct(data.percent)} · Avance vs ${money(data.budget)}</span><span>Faltan ${money(data.missing)}</span></div>
      
    </article>`;
  }
  function updateDashboardMetric(metric,amount,days){
    if(!metric) return metric;
    const sold=Number(metric.sold||0)+Number(amount||0);
    const budget=Number(metric.budget||0);
    const worked=Number(days?.worked||0);
    const programmed=Number(days?.programmed||0);
    return {
      ...metric,
      sold,
      missing:Math.max(budget-sold,0),
      percent:budget>0?sold/budget*100:0,
      projection:worked>0?sold/worked*programmed:0
    };
  }
  function applyRegisteredSaleToDashboard(sale){
    const d=state.data?.dashboard;
    const saleId=String(sale?.ID_VENTA||'');
    const amount=Number(sale?.MONTO||0);
    if(!d||!saleId||!(amount>0)||state.appliedSaleIds.has(saleId)) return;
    d.general=updateDashboardMetric(d.general,amount,d.days);
    if(sale.CATEGORIA==='Con congelador') d.con=updateDashboardMetric(d.con,amount,d.days);
    if(sale.CATEGORIA==='Sin congelador') d.sin=updateDashboardMetric(d.sin,amount,d.days);
    state.appliedSaleIds.add(saleId);
  }

  function renderDashboard(){
    const d=state.data.dashboard;
    $('#page').innerHTML=`<section class="page">
      <div class="page-head">
        <div><h2>Ruta ${esc(state.user.RUTA)}</h2><p>${esc(state.user.AGENCIA||'')} · ${d.period?`${monthName(d.period.MES)} ${d.period.ANIO}`:'Sin período activo'}</p></div>
        <div class="page-head-actions">
          <span class="route-chip">${d.days.worked}/${d.days.programmed} días</span>
          <button class="icon-btn" data-action="refresh" aria-label="Actualizar" title="Actualizar">${icon('refresh',20)}</button>
        </div>
      </div>
      <article class="card hero-card">
        <div class="hero-top">
          <div><div class="eyebrow">Presupuesto general</div><div class="hero-amount">${money(d.general.budget)}</div><div class="hero-sub">Presupuesto total</div></div>
          ${progressRing(d.general.percent)}
        </div>
        <div class="progress"><span style="width:${clamp(d.general.percent,0,100)}%"></span></div>
        <div class="stat-row">
          <div class="stat-cell"><div class="stat-label">Total vendido</div><div class="stat-value">${money(d.general.sold)}</div></div>
          <div class="stat-cell"><div class="stat-label">Faltante</div><div class="stat-value">${money(d.general.missing)}</div></div>
        </div>
      </article>
      <div class="indicator-grid">${indicatorCard('con',d.con)}${indicatorCard('sin',d.sin)}</div>
      <div class="smart-message"><span class="smart-dot"></span><span>${smartMessage(d.general.percent)}</span><span class="muted" style="margin-left:auto;font-size:11px">Proyección ${money(d.general.projection)}</span></div>
    </section>`;
  }

  function filteredClients(category=state.salesCategory,query=state.salesSearch){
    const q=normalize(query);
    return (state.data.clients||[]).filter(c=>c.CATEGORIA===category && c.ESTADO!=='INACTIVO' && (!q || normalize(`${c.NOMBRE_NEGOCIO} ${c.DIRECCION} ${c.REFERENCIA} ${c.ID_CLIENTE}`).includes(q)));
  }
  function clientListItem(c){
    return `<div class="list-item clickable" data-action="open-sale" data-client="${esc(c.ID_CLIENTE)}">
      <div class="list-icon">${icon(c.CATEGORIA==='Con congelador'?'snow':'box',18)}</div>
      <div class="list-main"><div class="list-title">${esc(c.NOMBRE_NEGOCIO)}</div><div class="list-sub">${esc(c.DIRECCION||c.REFERENCIA||c.ID_CLIENTE)}</div></div>
      <div class="list-side">${icon('chevron',17)}</div>
    </div>`;
  }
  function renderSales(){
    const clients=filteredClients();
    $('#page').innerHTML=`<section class="page">
      <div class="page-head">
        <div><h2>Registrar venta</h2><p>Selecciona el tipo y luego el cliente.</p></div>
        <div class="page-head-actions"><button class="icon-btn" data-action="open-history" title="Historial">${icon('history',20)}</button><button class="icon-btn" data-action="refresh" aria-label="Actualizar" title="Actualizar">${icon('refresh',20)}</button></div>
      </div>
      <div class="segmented">
        <button class="${state.salesCategory==='Con congelador'?'active':''}" data-action="sales-category" data-category="Con congelador">❄️ Con congelador</button>
        <button class="${state.salesCategory==='Sin congelador'?'active':''}" data-action="sales-category" data-category="Sin congelador">📦 Sin congelador</button>
      </div>
      <div class="toolbar">
        <div class="search"><span>${icon('search',18)}</span><input id="sales-search" value="${esc(state.salesSearch)}" placeholder="Escribe para buscar cliente..."></div>
        <button class="btn btn-outline btn-sm" data-action="open-create-client">+ Cliente</button>
      </div>
      ${pendingSalesStatusHTML()}
      <div class="section-title"><h3>${state.salesSearch?'Resultados':'Clientes frecuentes'}</h3><span class="small muted">${clients.length} clientes</span></div>
      <div class="list" id="sales-client-list">
        ${clients.length?clients.map(clientListItem).join(''):`<div class="empty-state"><div class="empty-icon">${icon('users',22)}</div><h3>No encontramos clientes</h3><p>Prueba otra búsqueda o crea un cliente nuevo.</p></div>`}
      </div>
      ${!state.salesSearch&&clients.length>3?'<div style="text-align:center;margin-top:8px"><button class="btn-link" data-action="show-all-sales-clients">Ver todos los clientes ›</button></div>':''}
    </section>`;
    if(!state.salesSearch && clients.length>3){
      const list=$('#sales-client-list'); list.innerHTML=clients.slice(0,3).map(clientListItem).join('');
    }
  }
  function refreshSalesList(showAll=false){
    const list=$('#sales-client-list'); if(!list) return;
    let clients=filteredClients();
    if(!state.salesSearch&&!showAll) clients=clients.slice(0,3);
    list.innerHTML=clients.length?clients.map(clientListItem).join(''):`<div class="empty-state"><div class="empty-icon">${icon('users',22)}</div><h3>No encontramos clientes</h3><p>Prueba otra búsqueda o crea un cliente nuevo.</p></div>`;
  }

  function historyFiltered(items){
    const q=normalize(state.historySearch);
    return items.filter(i=>{
      if(state.historyType!=='TODOS'&&i.kind!==state.historyType) return false;
      if(state.historyMonth!=='TODOS' && String(i.FECHA||'').slice(0,7)!==state.historyMonth) return false;
      if(q&&!normalize(`${i.CLIENTE} ${i.CATEGORIA||''} ${i.CANAL||''} ${i.MOTIVO||''}`).includes(q)) return false;
      return true;
    });
  }
  async function renderHistory(){
    $('#page').innerHTML=`<section class="page history-page"><div class="page-head"><div><h2>Historial</h2><p>Ventas y notas de crédito registradas.</p></div><div class="page-head-actions"><button class="icon-btn" data-action="refresh" aria-label="Actualizar" title="Actualizar">${icon('refresh',20)}</button><button class="icon-btn" data-action="back-sales" aria-label="Volver">${icon('back',21)}</button></div></div><div class="card"><div class="muted small">Cargando historial...</div></div></section>`;
    try{
      const items=await api.request('history',{}); state.history=items;
      const months=[...new Set(items.map(x=>String(x.FECHA||'').slice(0,7)).filter(Boolean))].sort().reverse();
      $('#page').innerHTML=`<section class="page history-page">
        <div class="page-head"><div><h2>Historial</h2><p>Ventas y notas de crédito registradas.</p></div><div class="page-head-actions"><button class="icon-btn" data-action="refresh" aria-label="Actualizar" title="Actualizar">${icon('refresh',20)}</button><button class="icon-btn" data-action="back-sales" aria-label="Volver">${icon('back',21)}</button></div></div>
        <div class="search" style="margin-bottom:9px"><span>${icon('search',18)}</span><input id="history-search" value="${esc(state.historySearch)}" placeholder="Buscar en historial..."></div>
        <div class="filter-row">
          <select id="history-type"><option value="TODOS">Todos los tipos</option><option value="VENTA" ${state.historyType==='VENTA'?'selected':''}>Ventas</option><option value="NC" ${state.historyType==='NC'?'selected':''}>Notas de crédito</option></select>
          <select id="history-month"><option value="TODOS">Todos los meses</option>${months.map(m=>`<option value="${m}" ${state.historyMonth===m?'selected':''}>${esc(monthLabel(m))}</option>`).join('')}</select>
        </div>
        <div id="history-list"></div>
      </section>`;
      refreshHistory();
    }catch(err){ toast(err.message,'error'); }
  }
  function refreshHistory(){
    const root=$('#history-list'); if(!root) return;
    const arr=historyFiltered(state.history||[]);
    root.innerHTML=arr.length?arr.map(historyCard).join(''):`<div class="empty-state"><div class="empty-icon">${icon('history',22)}</div><h3>Sin registros</h3><p>No hay movimientos que coincidan con los filtros.</p></div>`;
  }
  function historyCard(x){
    const sale=x.kind==='VENTA';
    const meta=[dateLabel(x.FECHA),timeLabel(x.HORA)].filter(Boolean).join(' · ');
    const tag=sale?x.CATEGORIA:x.CANAL;
    return `<article class="history-card">
      <div class="history-card-head">
        <div class="history-type ${sale?'':'nc'}">${sale?'Venta':'Nota de crédito'}</div>
        <div class="history-amount-wrap">
          ${!sale?'<div class="history-amount-label">Total NC</div>':''}
          <div class="history-amount">${money(sale?x.MONTO:x.TOTAL_NC)}</div>
        </div>
      </div>
      <div class="history-title">${esc(x.CLIENTE||'Cliente')}</div>
      ${(meta||tag)?`<div class="history-info-row">
        ${meta?`<div class="history-meta">${esc(meta)}</div>`:''}
        ${tag?`<span class="history-tag ${sale?'sale':'nc'}">${esc(tag)}</span>`:''}
      </div>`:''}
      ${!sale&&x.MOTIVO?`<div class="history-reason"><span>Motivo</span><strong>${esc(x.MOTIVO)}</strong></div>`:''}
      <div class="history-actions">
        <button data-action="history-view" data-kind="${x.kind}" data-id="${sale?x.ID_VENTA:x.ID_NC}">Ver</button>
        <button data-action="history-edit" data-kind="${x.kind}" data-id="${sale?x.ID_VENTA:x.ID_NC}">Editar</button>
        <button class="danger" data-action="history-delete" data-kind="${x.kind}" data-id="${sale?x.ID_VENTA:x.ID_NC}">Eliminar</button>
      </div>
    </article>`;
  }

  function currentMotive(){ return (state.data.motives||[]).find(m=>m.ID_MOTIVO===state.ncDraft.motiveId) || null; }
  function ncItemsArray(){
    return Object.entries(state.ncDraft.items||{}).map(([productId,quantity])=>{
      const p=state.ncDraft.catalog.find(x=>x.ID_PRODUCTO===productId);
      return p?{...p,quantity:Number(quantity)}:null;
    }).filter(Boolean).filter(x=>x.quantity>0);
  }
  function ncTotals(){
    const items=ncItemsArray(); const subtotal=items.reduce((a,x)=>a+Number(x.PRECIO||0)*x.quantity,0); const rate=Number(currentMotive()?.PORCENTAJE_APLICACION||0);
    return {items,subtotal,rate,total:subtotal*rate,units:items.reduce((a,x)=>a+x.quantity,0)};
  }
  function renderNcSelectedEditor(items){
    if(!items.length){
      return `<div class="nc-edit-empty">No hay productos seleccionados en esta nota de crédito.</div>`;
    }
    return `<div class="nc-edit-selected">${items.map(x=>`<div class="nc-edit-selected-row">
      <div class="nc-edit-selected-main">
        <div class="nc-edit-selected-name">${esc(x.PRODUCTO)}</div>
        <div class="nc-edit-selected-meta">${money(x.PRECIO)} c/u · ${money(x.PRECIO*x.quantity)}</div>
        <button class="btn-link tiny" data-action="nc-remove-selected" data-product="${esc(x.ID_PRODUCTO)}">Quitar</button>
      </div>
      <div class="qty-pill"><button data-action="nc-qty" data-product="${esc(x.ID_PRODUCTO)}" data-delta="-1">−</button><span>${x.quantity}</span><button data-action="nc-qty" data-product="${esc(x.ID_PRODUCTO)}" data-delta="1">+</button></div>
    </div>`).join('')}</div>`;
  }

  function hydrateNcItems(detailItems,catalog){
    const byId=new Map((catalog||[]).map(p=>[String(p.ID_PRODUCTO),p]));
    const byName=new Map((catalog||[]).map(p=>[normalize(p.PRODUCTO),p]));
    const out={};
    (detailItems||[]).forEach(item=>{
      let id=String(item.ID_PRODUCTO||'').trim();
      if(!byId.has(id)){
        const match=byName.get(normalize(item.PRODUCTO));
        if(match) id=String(match.ID_PRODUCTO);
      }
      const qty=Math.max(0,Math.floor(Number(item.CANTIDAD||item.quantity||0)));
      if(id&&byId.has(id)&&qty>0) out[id]=qty;
    });
    return out;
  }
  let ncCatalogLoading=false;
  let ncCatalogRequestId=0;
  const NC_CATALOG_CACHE_MS=10*60*1000;
  const ncCatalogCache=new Map();
  const ncCatalogInflight=new Map();

  function cachedNcCatalog(channel){
    const key=String(channel||'');
    const entry=ncCatalogCache.get(key);
    if(!entry) return null;
    if(Date.now()-Number(entry.loadedAt||0)>NC_CATALOG_CACHE_MS){
      ncCatalogCache.delete(key);
      return null;
    }
    return Array.isArray(entry.catalog)?entry.catalog:null;
  }

  function getNcCatalogFast(channel,{force=false}={}){
    const key=String(channel||'');
    if(!key) return Promise.resolve([]);
    if(!force){
      const cached=cachedNcCatalog(key);
      if(cached) return Promise.resolve(cached);
      if(ncCatalogInflight.has(key)) return ncCatalogInflight.get(key);
    }
    const request=api.request('getNcCatalog',{channel:key})
      .then(catalog=>{
        const clean=Array.isArray(catalog)?catalog:[];
        ncCatalogCache.set(key,{catalog:clean,loadedAt:Date.now()});
        return clean;
      })
      .finally(()=>{
        if(ncCatalogInflight.get(key)===request) ncCatalogInflight.delete(key);
      });
    ncCatalogInflight.set(key,request);
    return request;
  }

  function renderNcCatalogLoading(){
    return `<div class="nc-catalog-loading" role="status" aria-live="polite" aria-busy="true">
      <div class="nc-catalog-loading-icon"><span class="nc-catalog-spinner" aria-hidden="true"></span></div>
      <div class="nc-catalog-loading-copy">
        <strong>Cargando catálogo...</strong>
        <span>Preparando productos y precios de ${esc(state.ncDraft.channel||'este canal')}.</span>
      </div>
      <div class="nc-catalog-skeleton" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
    </div>`;
  }

  async function loadNcCatalog({force=false}={}){
    if(!state.ncDraft.channel) return [];

    const channel=String(state.ncDraft.channel);
    const requestId=++ncCatalogRequestId;
    const cached=!force?cachedNcCatalog(channel):null;

    if(cached){
      state.ncDraft.catalog=cached;
      ncCatalogLoading=false;
      renderNC();
      return cached;
    }

    ncCatalogLoading=true;
    renderNC();

    try{
      const catalog=await getNcCatalogFast(channel,{force});
      if(requestId!==ncCatalogRequestId||String(state.ncDraft.channel)!==channel) return catalog;
      state.ncDraft.catalog=catalog;
      return catalog;
    }catch(err){
      if(requestId===ncCatalogRequestId) toast(err.message,'error');
      return [];
    }finally{
      if(requestId===ncCatalogRequestId){
        ncCatalogLoading=false;
        renderNC();
      }
    }
  }

  function renderNC(){
    const draft=state.ncDraft, motive=currentMotive();
    const motives=(state.data.motives||[]).filter(m=>m.CANAL===draft.channel);
    const ready=Boolean(draft.channel&&draft.motiveId);
    const totals=ncTotals();
    $('#page').innerHTML=`<section class="page">
      <div class="page-head">
        <div><h2>${draft.editId?'Editar NC':'Nueva nota de crédito'}</h2><p>Registro de cambios de producto.</p></div>
        <div class="page-head-actions">
          <button class="icon-btn" data-action="refresh" aria-label="Actualizar" title="Actualizar">${icon('refresh',20)}</button>
          ${draft.editId?`<button class="btn btn-outline btn-sm" data-action="reset-nc">Cancelar edición</button>`:''}
        </div>
      </div>
      <div class="stepper"><span class="on"></span><span class="${draft.channel?'on':''}"></span><span class="${ready?'on':''}"></span></div>
      <div class="section-title"><h3>1. Selecciona el canal</h3></div>
      <div class="option-grid">
        ${(state.data.channels||[]).map(c=>`<button class="option-card ${draft.channel===c.NOMBRE_CANAL?'active':''}" data-action="nc-channel" data-channel="${esc(c.NOMBRE_CANAL)}"><div class="option-title">${esc(c.NOMBRE_CANAL)}</div><div class="option-sub">Precios correspondientes al canal</div></button>`).join('')}
      </div>
      ${draft.channel?`<div class="section-title"><h3>2. Motivo</h3></div><div class="field" style="margin-bottom:10px"><select id="nc-motive"><option value="">Selecciona un motivo</option>${motives.map(m=>`<option value="${esc(m.ID_MOTIVO)}" ${draft.motiveId===m.ID_MOTIVO?'selected':''}>${esc(m.MOTIVO)} · ${Math.round(Number(m.PORCENTAJE_APLICACION)*100)}%</option>`).join('')}</select></div>`:''}
      ${ready?(ncCatalogLoading?`<div class="section-title"><h3>3. Productos</h3><span class="small muted">Cargando catálogo</span></div>${renderNcCatalogLoading()}`:`${draft.editId?`<div class="section-title"><h3>3. Productos seleccionados</h3><span class="small muted">${totals.units} unidades</span></div>
        ${renderNcSelectedEditor(totals.items)}
        <div class="section-title nc-add-more-title"><h3>Agregar más productos</h3><span class="small muted">Aplicación ${Math.round(Number(motive.PORCENTAJE_APLICACION)*100)}%</span></div>`:`<div class="section-title"><h3>3. Productos</h3><span class="small muted">Aplicación ${Math.round(Number(motive.PORCENTAJE_APLICACION)*100)}%</span></div>`}
        <div class="search" style="margin-bottom:10px"><span>${icon('search',18)}</span><input id="product-search" placeholder="Buscar producto, código o precio..."></div>
        <div id="product-list" class="product-list">${renderProductCards(draft.editId?draft.catalog.filter(p=>!Number(draft.items[p.ID_PRODUCTO]||0)):draft.catalog, draft.editId)}</div>
        ${totals.units?`<div class="cart-bar"><div><div class="tiny" style="opacity:.7">${totals.units} unidades</div><strong>${money(totals.total)}</strong></div><button data-action="open-nc-summary">Ver resumen ${icon('chevron',17)}</button></div>`:''}`):''}
    </section>`;
  }
  function renderProductCards(products,editing=false){
    if(!products?.length) return `<div class="empty-state"><div class="empty-icon">${icon('box',22)}</div><h3>${editing?'Sin productos por agregar':'Sin productos'}</h3><p>${editing?'Los productos seleccionados ya están arriba.':'Agrega productos y precios activos en Google Sheets.'}</p></div>`;
    return products.map(p=>{
      const q=Number(state.ncDraft.items[p.ID_PRODUCTO]||0);
      return `<article class="product-card" data-search="${esc(normalize(`${p.PRODUCTO} ${p.CODIGO} ${p.REFERENCIAS_BUSQUEDA} ${p.PRECIO}`))}">
        <div class="product-main"><div class="product-name">${esc(p.PRODUCTO)}</div><div class="product-code">Código ${esc(p.CODIGO||p.ID_PRODUCTO)}</div><div class="product-price">${money(p.PRECIO)}</div></div>
        ${q?`<div class="qty-pill"><button data-action="nc-qty" data-product="${esc(p.ID_PRODUCTO)}" data-delta="-1">−</button><span>${q}</span><button data-action="nc-qty" data-product="${esc(p.ID_PRODUCTO)}" data-delta="1">+</button></div>`:`<button class="btn btn-outline btn-sm" data-action="nc-qty" data-product="${esc(p.ID_PRODUCTO)}" data-delta="1">AGREGAR</button>`}
      </article>`;
    }).join('');
  }
  function openNcSummary(){
    const t=ncTotals(); if(!t.items.length) return;
    const freezerClients=(state.data.clients||[]).filter(c=>c.CATEGORIA==='Con congelador'&&c.ESTADO!=='INACTIVO');
    openModal(`${state.ncDraft.editId?'Editar':'Resumen de'} NC`, `${esc(state.ncDraft.channel)} · ${Math.round(t.rate*100)}%`, `
      <div>${t.items.map(x=>`<div class="cart-item"><div><div class="cart-item-title">${esc(x.PRODUCTO)}</div><div class="cart-item-price">${money(x.PRECIO)} × ${x.quantity} = ${money(x.PRECIO*x.quantity)}</div><button class="btn-link tiny" data-action="nc-remove" data-product="${esc(x.ID_PRODUCTO)}" style="padding-left:0">Quitar</button></div><div class="qty-pill"><button data-action="nc-qty-modal" data-product="${esc(x.ID_PRODUCTO)}" data-delta="-1">−</button><span>${x.quantity}</span><button data-action="nc-qty-modal" data-product="${esc(x.ID_PRODUCTO)}" data-delta="1">+</button></div></div>`).join('')}</div>
      <div style="padding:10px 0">
        <div class="summary-line"><span class="muted">Subtotal</span><strong>${money(t.subtotal)}</strong></div>
        <div class="summary-line"><span class="muted">Aplicación</span><strong>${Math.round(t.rate*100)}%</strong></div>
        <div class="summary-line summary-total"><span>Total NC</span><span>${money(t.total)}</span></div>
      </div>
      <div class="field"><label>Cliente con congelador</label><select id="nc-client"><option value="">Selecciona un cliente</option>${freezerClients.map(c=>`<option value="${esc(c.ID_CLIENTE)}" ${String(state.ncDraft.clientId||'')===String(c.ID_CLIENTE)?'selected':''}>${esc(c.NOMBRE_NEGOCIO)} · ${esc(c.DIRECCION||'')}</option>`).join('')}</select></div>
      <div class="form-actions"><button class="btn btn-secondary" data-action="close-modal">CANCELAR</button><button class="btn btn-primary" data-action="save-nc" id="save-nc-btn">${state.ncDraft.editId?'GUARDAR CAMBIOS':'GUARDAR NC'}</button></div>
    `);
  }

  function renderMore(){
    $('#page').innerHTML=`<section class="page">
      <div class="page-head"><div><h2>Más</h2><p>Configuración y datos de tu ruta.</p></div><button class="icon-btn" data-action="refresh" aria-label="Actualizar" title="Actualizar">${icon('refresh',20)}</button></div>
      <div class="menu-list">
        ${menuCard('mas-user','user','Usuario','Consulta tu información de cuenta')}
        ${menuCard('mas-budget','wallet','Presupuesto','Presupuesto y días de preventa')}
        ${menuCard('mas-clients','users','Base de clientes','Administra tu cartera de clientes')}
        ${menuCard('mas-about','info','Detalles de Sombrela 360','Información de la herramienta')}
        <button class="menu-card" data-action="logout" style="text-align:left;color:var(--red)"><span class="list-icon" style="color:var(--red);background:var(--red-soft)">${icon('logout',20)}</span><span class="list-main"><span class="list-title">Cerrar sesión</span><span class="list-sub">Salir de esta ruta</span></span><span class="chev">${icon('chevron',18)}</span></button>
      </div>
    </section>`;
  }
  function menuCard(view,ic,title,sub){ return `<button class="menu-card" data-view="${view}" style="text-align:left"><span class="list-icon">${icon(ic,20)}</span><span class="list-main"><span class="list-title">${title}</span><span class="list-sub">${sub}</span></span><span class="chev">${icon('chevron',18)}</span></button>`; }
  function backHeader(title,sub){return `<div class="page-head"><div><h2>${title}</h2><p>${sub}</p></div><div class="page-head-actions"><button class="icon-btn" data-action="refresh" aria-label="Actualizar" title="Actualizar">${icon('refresh',20)}</button><button class="icon-btn" data-view="mas" aria-label="Volver">${icon('back',21)}</button></div></div>`;}
  function renderUser(){
    const u=state.user;
    $('#page').innerHTML=`<section class="page">${backHeader('Usuario','Datos del usuario.')}
      <div class="info-grid">
        ${infoTile('Nombre',u.NOMBRE)}${infoTile('Apellido',u.APELLIDO)}${infoTile('Ruta',u.RUTA)}${infoTile('Agencia',u.AGENCIA)}${infoTile('ID usuario',u.ID_USUARIO)}${infoTile('Fecha de creación',dateLabel(u.FECHA_CREACION))}
      </div>
      <div class="smart-message" style="margin-top:12px"><span class="smart-dot"></span><span>Ruta y agencia son datos administrados por supervisión.</span></div>
    </section>`;
  }
  function infoTile(label,value){return `<div class="info-tile"><div class="label">${label}</div><div class="value">${esc(value||'—')}</div></div>`;}

  function calendarHTML(year,month,selected,prefix='budget'){
    const first=new Date(year,month-1,1), last=new Date(year,month,0), offset=(first.getDay()+6)%7;
    const names=['L','M','M','J','V','S','D']; let cells='';
    for(let i=0;i<offset;i++) cells+='<button class="day off" tabindex="-1"></button>';
    for(let d=1;d<=last.getDate();d++){
      const iso=`${year}-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      cells+=`<button type="button" class="day ${selected.has(iso)?'selected':''} ${iso===todayISO()?'today':''}" data-action="toggle-date" data-set="${prefix}" data-date="${iso}">${d}</button>`;
    }
    return `<div class="calendar"><div class="calendar-head">${names.map(n=>`<span>${n}</span>`).join('')}</div><div class="calendar-grid">${cells}</div><div class="calendar-note">Seleccionados: ${selected.size} días de preventa</div></div>`;
  }
  function renderBudget(){
    const p=state.data.period;
    if(!p){ $('#page').innerHTML=`<section class="page">${backHeader('Presupuesto','No hay período activo.')}<div class="empty-state"><div class="empty-icon">${icon('calendar',22)}</div><h3>Sin período activo</h3><p>Inicia un nuevo mes para comenzar.</p><button class="btn btn-primary" style="margin-top:16px" data-action="open-new-period">INICIAR NUEVO MES</button></div></section>`; return; }
    $('#page').innerHTML=`<section class="page">${backHeader('Presupuesto',`${monthName(p.MES)} ${p.ANIO} · ${esc(p.ORIGEN_MODIFICACION||'')}`)}
      <form id="budget-form">
        <div class="card">
          <div class="field"><label>Presupuesto con congelador</label><input name="budgetCon" type="number" min="0" step="0.01" value="${Number(p.PRESUPUESTO_CONGELADOR||0)}"></div>
          <div class="field"><label>Presupuesto sin congelador</label><input name="budgetSin" type="number" min="0" step="0.01" value="${Number(p.PRESUPUESTO_SIN_CONGELADOR||0)}"></div>
          <div class="section-title"><h3>Días de preventa</h3><span class="small muted">Calendario del período</span></div>
          <div id="budget-calendar">${calendarHTML(Number(p.ANIO),Number(p.MES),state.budgetDates,'budget')}</div>
          <button class="btn btn-primary btn-block" style="margin-top:15px" type="submit">${icon('save',18)} GUARDAR CAMBIOS</button>
        </div>
      </form>
      <button class="btn btn-outline btn-block" style="margin-top:12px" data-action="open-new-period">INICIAR NUEVO MES</button>
      <p class="small muted" style="line-height:1.5;padding:0 4px">Editar este período no elimina ventas, NC, clientes ni historial. Si el supervisor modifica posteriormente el presupuesto, prevalecerá la última asignación oficial.</p>
    </section>`;
  }
  function renderClientBase(){
    const q=normalize(state.clientBaseSearch||''); const cat=state.clientBaseCategory||'Con congelador';
    const arr=(state.data.clients||[]).filter(c=>c.CATEGORIA===cat&&c.ESTADO!=='INACTIVO'&&(!q||normalize(`${c.NOMBRE_NEGOCIO} ${c.DIRECCION} ${c.REFERENCIA}`).includes(q)));
    $('#page').innerHTML=`<section class="page">${backHeader('Base de clientes','Administra los clientes de tu ruta.')}
      <div class="segmented"><button class="${cat==='Con congelador'?'active':''}" data-action="base-category" data-category="Con congelador">❄️ Con congelador</button><button class="${cat==='Sin congelador'?'active':''}" data-action="base-category" data-category="Sin congelador">📦 Sin congelador</button></div>
      <div class="toolbar"><div class="search"><span>${icon('search',18)}</span><input id="base-search" value="${esc(state.clientBaseSearch||'')}" placeholder="Buscar cliente..."></div><button class="btn btn-outline btn-sm" data-action="open-create-client">+ Cliente</button></div>
      <div class="list" id="base-list">${arr.length?arr.map(c=>`<div class="list-item"><div class="list-icon">${icon(c.CATEGORIA==='Con congelador'?'snow':'box',18)}</div><div class="list-main"><div class="list-title">${esc(c.NOMBRE_NEGOCIO)}</div><div class="list-sub">${esc(c.DIRECCION||c.REFERENCIA||'')}</div></div><button class="icon-btn" data-action="edit-client" data-client="${esc(c.ID_CLIENTE)}">${icon('edit',18)}</button></div>`).join(''):`<div class="empty-state"><div class="empty-icon">${icon('users',22)}</div><h3>Sin clientes</h3><p>No hay clientes activos en esta categoría.</p></div>`}</div>
    </section>`;
  }
  function refreshClientBase(){ if(state.view==='mas-clients') renderClientBase(); }
  function renderAbout(){
    $('#page').innerHTML=`<section class="page">${backHeader('Sombrela 360','Detalles de la herramienta')}
      <article class="card">
        <div class="about-hero"><div class="brand-logo"><img src="assets/icon-192.png" alt="Sombrela 360"></div><h2>Sombrela 360</h2><p><strong>Control, seguimiento y claridad en cada venta.</strong></p></div>
        <div class="about-copy">
          <p>Sombrela 360 nació para facilitar el control mensual de ventas de Helados Sombrela, permitiendo registrar cada venta y nota de crédito en un solo lugar.</p>
          <p>Su Dashboard muestra de forma clara el avance del mes, ayudando al vendedor a conocer dónde está, cuánto le falta y cuándo necesita impulsar sus ventas para alcanzar sus objetivos.</p>
          <h3>¿Cómo nació?</h3>
          <p>La idea surgió al observar que varios integrantes del equipo de ventas llevaban sus registros en blocs de notas y apuntes que podían perderse o volverse difíciles de controlar.</p>
          <p>A partir de esa necesidad nació una solución más práctica, ordenada y accesible desde el teléfono.</p>
          <p>Esta es una herramienta creada desde la experiencia en campo, pensada para simplificar el seguimiento diario y tener siempre una visión clara de las ventas mensuales.</p>
          <div class="signature">Ideado y armado por Sergio Pascual y Darwin Gómez</div>
        </div>
      </article>
    </section>`;
  }

  let modalScrollY = 0;
let modalScrollLocked = false;

function lockModalScroll(){
  if(modalScrollLocked) return;

  modalScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  modalScrollLocked = true;

  document.body.style.position = 'fixed';
  document.body.style.top = `-${modalScrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
}

function unlockModalScroll(){
  if(!modalScrollLocked) return;

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';

  modalScrollLocked = false;

  window.scrollTo(0, modalScrollY);
}

function openModal(title,sub,body){
  lockModalScroll();

  $('#modal-root').innerHTML=`
    <div class="modal-backdrop" data-action="close-modal-backdrop">
      <div class="modal" role="dialog" aria-modal="true">
        <div class="modal-head">
          <div>
            <h2>${title}</h2>
            ${sub?`<p>${sub}</p>`:''}
          </div>
          <button class="close-btn" data-action="close-modal">
            ${icon('close',18)}
          </button>
        </div>
        ${body}
      </div>
    </div>`;
}

function closeModal(){
  $('#modal-root').innerHTML='';
  unlockModalScroll();
}
  
  let toastTimer;
  function toast(msg,type=''){ clearTimeout(toastTimer); $('#toast-root').innerHTML=`<div class="toast ${type}">${esc(msg)}</div>`; toastTimer=setTimeout(()=>$('#toast-root').innerHTML='',2800); }
  function confirmModal(title,msg,okText,onAction,onData=''){
    openModal(title,'',`<p class="about-copy" style="margin:0">${msg}</p><div class="form-actions"><button class="btn btn-secondary" data-action="close-modal">CANCELAR</button><button class="btn btn-danger" data-action="${onAction}" ${onData}>${okText}</button></div>`);
  }

  let createUserOpening = false;

  async function openCreateUser(trigger){
    if(createUserOpening) return;

    createUserOpening = true;

    if(trigger){
      trigger.disabled = true;
      trigger.style.opacity = '.45';
      trigger.style.pointerEvents = 'none';
      trigger.setAttribute('aria-busy','true');
    }

    try{
      const agencies = await api.request('getAgencies',{});

      openModal('Crear usuario','Tu número de ruta será tu usuario.',`<form id="create-user-form">
        <div class="field"><label>Agencia</label><select name="agencyId" required><option value="">Selecciona una agencia</option>${agencies.map(a=>`<option value="${esc(a.ID_AGENCIA)}">${esc(a.AGENCIA)}</option>`).join('')}</select></div>
        <div class="field"><label>Nombre</label><input name="name" required autocomplete="given-name"></div>
        <div class="field"><label>Apellido</label><input name="lastName" required autocomplete="family-name"></div>
        <div class="field"><label>Número de ruta</label><input name="route" required inputmode="numeric"></div>
        <button class="btn btn-primary btn-block" type="submit">CREAR USUARIO</button>
      </form>`);
    }catch(e){
      toast(e.message,'error');
    }finally{
      createUserOpening = false;

      if(trigger){
        trigger.disabled = false;
        trigger.style.opacity = '';
        trigger.style.pointerEvents = '';
        trigger.removeAttribute('aria-busy');
      }
    }
  }
  function openCreateClient(edit=null){
    const c=edit;
    openModal(c?'Editar cliente':'Nuevo cliente',c?'Actualiza los datos sin perder su historial.':'El cliente quedará relacionado únicamente con tu ruta.',`<form id="client-form">
      ${c?`<input type="hidden" name="clientId" value="${esc(c.ID_CLIENTE)}">`:''}
      <div class="field"><label>Tipo de cliente</label><select name="category" required><option value="Con congelador" ${c?.CATEGORIA==='Con congelador'?'selected':''}>Con congelador</option><option value="Sin congelador" ${c?.CATEGORIA==='Sin congelador'?'selected':''}>Sin congelador</option></select></div>
      <div class="field"><label>Nombre del negocio</label><input name="business" required value="${esc(c?.NOMBRE_NEGOCIO||'')}"></div>
      <div class="field"><label>Dirección</label><input name="address" value="${esc(c?.DIRECCION||'')}"></div>
      <div class="field"><label>Referencia</label><input name="reference" value="${esc(c?.REFERENCIA||'')}"></div>
      <div class="form-actions"><button class="btn btn-secondary" type="button" data-action="close-modal">CANCELAR</button><button class="btn btn-primary" type="submit">GUARDAR</button></div>
      ${c?`<button type="button" class="btn btn-danger btn-block" style="margin-top:10px" data-action="ask-deactivate-client" data-client="${esc(c.ID_CLIENTE)}">DESACTIVAR CLIENTE</button>`:''}
    </form>`);
  }
  function openSale(client){
    const saleId=saleOperationId();
    openModal('Registrar venta',esc(client.NOMBRE_NEGOCIO),`<form id="sale-form"><input type="hidden" name="saleId" value="${esc(saleId)}"><input type="hidden" name="clientId" value="${esc(client.ID_CLIENTE)}"><div class="info-tile" style="margin-bottom:14px"><div class="label">Categoría</div><div class="value">${esc(client.CATEGORIA)}</div></div><div class="field"><label>Monto</label><input name="amount" type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="Q 0.00" autofocus required></div><div class="form-actions"><button class="btn btn-secondary" type="button" data-action="close-modal">CANCELAR</button><button class="btn btn-primary" type="submit">GUARDAR VENTA</button></div></form>`);
  }
  function openNewPeriod(){
    const now=new Date(), nextMonth=(state.data.period?Number(state.data.period.MES)%12+1:now.getMonth()+1), nextYear=state.data.period&&Number(state.data.period.MES)===12?Number(state.data.period.ANIO)+1:(state.data.period?Number(state.data.period.ANIO):now.getFullYear());
    state.newPeriodDates=new Set();
    openModal('Iniciar nuevo período','El período anterior permanecerá guardado en el historial.',`<form id="new-period-form">
      <div class="filter-row"><div class="field" style="margin:0"><label>Mes</label><select name="month" id="new-period-month">${Array.from({length:12},(_,i)=>i+1).map(m=>`<option value="${m}" ${m===nextMonth?'selected':''}>${monthName(m)}</option>`).join('')}</select></div><div class="field" style="margin:0"><label>Año</label><input type="number" name="year" id="new-period-year" value="${nextYear}" min="2025" max="2100"></div></div>
      <div class="field"><label>Presupuesto con congelador</label><input name="budgetCon" type="number" min="0" step="0.01" required></div>
      <div class="field"><label>Presupuesto sin congelador</label><input name="budgetSin" type="number" min="0" step="0.01" required></div>
      <div class="section-title"><h3>Días de preventa</h3></div><div id="new-period-calendar">${calendarHTML(nextYear,nextMonth,state.newPeriodDates,'new')}</div>
      <div class="smart-message"><span class="smart-dot" style="background:var(--amber)"></span><span>Al iniciar, ventas y NC del período anterior dejarán de mostrarse en el Dashboard, pero no se eliminarán.</span></div>
      <div class="form-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">CANCELAR</button><button class="btn btn-primary" type="submit">INICIAR NUEVO MES</button></div>
    </form>`);
  }
  function rerenderNewPeriodCalendar(){
    const m=Number($('#new-period-month')?.value), y=Number($('#new-period-year')?.value); const root=$('#new-period-calendar'); if(root&&m&&y) root.innerHTML=calendarHTML(y,m,state.newPeriodDates,'new');
  }

  async function refreshData(message='Actualizado'){
    try{
      ncCatalogCache.clear();
      // Si hay ventas locales, intentamos enviarlas antes de volver a leer Sheets.
      // Así el bootstrap siguiente trae un estado lo más consistente posible.
      await syncPendingSales({notify:false});

      const data=await api.request('bootstrap',{}); state.data=data; state.user=data.user; state.bootstrapAt=Date.now();
      state.budgetDates=new Set((data.days||[]).filter(d=>d.DIA_PROGRAMADO==='SI').map(d=>String(d.FECHA).slice(0,10)));
      navigate(state.view,false); toast(message,'success');
    }catch(err){toast(err.message,'error');}
  }

  async function handleClick(e){
    const viewBtn=e.target.closest('[data-view]');
    if(viewBtn){ navigate(viewBtn.dataset.view); return; }
    const el=e.target.closest('[data-action]'); if(!el) return;
    const a=el.dataset.action;
    if(a==='close-modal'){closeModal();return;}
    if(a==='close-modal-backdrop'&&e.target===el){closeModal();return;}
    if(a==='open-create-user'){await openCreateUser(el);return;}
    if(a==='retry-load'){try{await loadSession();}catch{}return;}
    if(a==='refresh'){await refreshData();return;}
    if(a==='sync-pending-sales'){await syncPendingSales({notify:true});return;}
    if(a==='sales-category'){state.salesCategory=el.dataset.category;state.salesSearch='';renderSales();return;}
    if(a==='show-all-sales-clients'){refreshSalesList(true);el.parentElement?.remove();return;}
    if(a==='open-create-client'){openCreateClient();return;}
    if(a==='open-sale'){const c=state.data.clients.find(x=>x.ID_CLIENTE===el.dataset.client);if(c)openSale(c);return;}
    if(a==='open-history'){navigate('ventas-history');return;}
    if(a==='back-sales'){navigate('ventas');return;}
    if(a==='nc-channel'){
      if(state.ncDraft.channel!==el.dataset.channel){
        state.ncDraft.channel=el.dataset.channel;
        state.ncDraft.motiveId='';
        state.ncDraft.items={};
        state.ncDraft.catalog=[];
      }
      renderNC();
      // Empezamos a traer productos y precios mientras el usuario selecciona el motivo.
      void loadNcCatalog();
      return;
    }
    if(a==='nc-qty'||a==='nc-qty-modal'){
      const id=el.dataset.product, d=Number(el.dataset.delta); state.ncDraft.items[id]=Math.max(0,Number(state.ncDraft.items[id]||0)+d); if(!state.ncDraft.items[id])delete state.ncDraft.items[id];
      if(a==='nc-qty-modal') openNcSummary(); else renderNC(); return;
    }
    if(a==='nc-remove'){delete state.ncDraft.items[el.dataset.product];openNcSummary();return;}
    if(a==='nc-remove-selected'){delete state.ncDraft.items[el.dataset.product];renderNC();return;}
    if(a==='open-nc-summary'){openNcSummary();return;}
    if(a==='save-nc'){await saveNCFromModal();return;}
    if(a==='reset-nc'){state.ncDraft={channel:'',motiveId:'',items:{},catalog:[],editId:null,clientId:'',operationId:''};renderNC();return;}
    if(a==='logout'){confirmModal('Cerrar sesión','¿Deseas salir de Sombrela 360?','CERRAR SESIÓN','confirm-logout');return;}
    if(a==='confirm-logout'){
      const token=state.session?.token||'';

      clearLocalSession();
      closeModal();
      renderLogin();

      // Se intenta invalidar también la sesión persistente del servidor,
      // pero no hacemos esperar al vendedor para salir.
      if(token) void api.request('logout',{token}).catch(()=>{});
      return;
    }
    if(a==='open-new-period'){openNewPeriod();return;}
    if(a==='toggle-date'){
  const set = el.dataset.set === 'new'
    ? state.newPeriodDates
    : state.budgetDates;

  const date = el.dataset.date;

  if(set.has(date)){
    set.delete(date);
  }else{
    set.add(date);
  }

  el.classList.toggle('selected', set.has(date));

  const calendar = el.closest('.calendar');
  const note = calendar?.querySelector('.calendar-note');

  if(note){
    note.textContent = `Seleccionados: ${set.size} días de preventa`;
  }

  el.blur();
  return;
}
    if(a==='base-category'){state.clientBaseCategory=el.dataset.category;state.clientBaseSearch='';renderClientBase();return;}
    if(a==='edit-client'){const c=state.data.clients.find(x=>x.ID_CLIENTE===el.dataset.client);if(c)openCreateClient(c);return;}
    if(a==='ask-deactivate-client'){confirmModal('Desactivar cliente','El historial del cliente se conservará. Solo dejará de aparecer como activo.','DESACTIVAR','deactivate-client',`data-client="${esc(el.dataset.client)}"`);return;}
    if(a==='deactivate-client'){await deactivateClient(el.dataset.client);return;}
    if(a==='history-view'){await runHistoryAction(el,()=>historyView(el.dataset.kind,el.dataset.id));return;}
    if(a==='history-edit'){await runHistoryAction(el,()=>historyEdit(el.dataset.kind,el.dataset.id));return;}
    if(a==='history-delete'){await runHistoryAction(el,()=>confirmModal('Eliminar registro','La operación se anulará para conservar trazabilidad histórica.','ELIMINAR','confirm-history-delete',`data-kind="${esc(el.dataset.kind)}" data-id="${esc(el.dataset.id)}"`));return;}
    if(a==='confirm-history-delete'){await runModalAction(el,'ELIMINANDO...',()=>historyDelete(el.dataset.kind,el.dataset.id));return;}
  }

  async function runModalAction(trigger,busyText,task){
    if(!trigger||trigger.dataset.busy==='1'||trigger.disabled) return;
    trigger.dataset.busy='1';
    trigger.dataset.originalText=trigger.textContent;
    trigger.disabled=true;
    trigger.setAttribute('aria-busy','true');
    if(busyText) trigger.textContent=busyText;
    try{
      return await task();
    }finally{
      if(trigger.isConnected){
        trigger.disabled=false;
        trigger.removeAttribute('aria-busy');
        trigger.textContent=trigger.dataset.originalText||trigger.textContent;
        delete trigger.dataset.originalText;
        delete trigger.dataset.busy;
      }
    }
  }

  let historyActionBusy=false;
  async function runHistoryAction(trigger,task){
    if(historyActionBusy||!trigger||trigger.disabled) return;
    historyActionBusy=true;
    const card=trigger.closest('.history-card');
    const buttons=card?[...card.querySelectorAll('.history-actions button')]:[trigger];
    buttons.forEach(btn=>{btn.disabled=true;btn.setAttribute('aria-busy','true');btn.classList.add('is-busy');});
    const started=Date.now();
    try{
      return await task();
    }finally{
      const wait=Math.max(0,350-(Date.now()-started));
      if(wait) await new Promise(resolve=>setTimeout(resolve,wait));
      buttons.forEach(btn=>{if(btn.isConnected){btn.disabled=false;btn.removeAttribute('aria-busy');btn.classList.remove('is-busy');}});
      historyActionBusy=false;
    }
  }

  function handleInput(e){
    if(e.target.id==='sales-search'){state.salesSearch=e.target.value;refreshSalesList(Boolean(state.salesSearch));}
    if(e.target.id==='history-search'){state.historySearch=e.target.value;refreshHistory();}
    if(e.target.id==='product-search'){
      const q=normalize(e.target.value);$$('.product-card').forEach(c=>c.style.display=(!q||c.dataset.search.includes(q))?'flex':'none');
    }
    if(e.target.id==='base-search'){state.clientBaseSearch=e.target.value;refreshClientBase();const inp=$('#base-search');if(inp){inp.focus();inp.setSelectionRange(inp.value.length,inp.value.length);}}
  }
  async function handleChange(e){
    if(e.target.id==='history-type'){state.historyType=e.target.value;refreshHistory();}
    if(e.target.id==='history-month'){state.historyMonth=e.target.value;refreshHistory();}
    if(e.target.id==='nc-motive'){
      state.ncDraft.motiveId=e.target.value;
      renderNC();
      if(state.ncDraft.motiveId&&!state.ncDraft.catalog.length) void loadNcCatalog();
    }
    if(e.target.id==='nc-client') state.ncDraft.clientId=e.target.value;
    if(e.target.id==='new-period-month'||e.target.id==='new-period-year'){state.newPeriodDates=new Set();rerenderNewPeriodCalendar();}
  }

  function beginFormSubmit(f){
    if(f.dataset.submitting==='1') return false;
    f.dataset.submitting='1';
    const btn=$('button[type="submit"]',f);
    if(btn){
      btn.dataset.originalHtml=btn.innerHTML;
      btn.disabled=true;
      btn.textContent=f.id==='login-form'?'INGRESANDO...':'GUARDANDO...';
    }
    return true;
  }
  function restoreFormSubmit(f){
    delete f.dataset.submitting;
    const btn=$('button[type="submit"]',f);
    if(!btn) return;
    btn.disabled=false;
    if(Object.prototype.hasOwnProperty.call(btn.dataset,'originalHtml')){
      btn.innerHTML=btn.dataset.originalHtml;
      delete btn.dataset.originalHtml;
    }
  }

  async function handleSubmit(e){
    e.preventDefault();

    const f=e.target;
    if(!(f instanceof HTMLFormElement)) return;
    if(!beginFormSubmit(f)) return;

    const fd=Object.fromEntries(new FormData(f).entries());
    try{
      if(f.id==='login-form'){
        // Mostramos inmediatamente una sola pantalla de carga.
        // Ya no dejamos al usuario esperando primero "INGRESANDO..." y luego
        // hacemos otra petición separada para cargar los datos.
        showInitialLoader();

        try{
          const res=await api.request('login',{
            route:fd.route,
            password:fd.password
          });

          saveLocalSession(
            res.token,
            res.expiresAt || res.data?.sessionExpiresAt
          );

          // Backend nuevo: login ya incluye bootstrap.
          if(res.data){
            finishInitialLoad(res.data);
          }else{
            // Compatibilidad temporal si todavía estuviera publicada una
            // versión anterior de Code.gs.
            await loadSession();
          }
        }catch(err){
          hideLoader();
          throw err;
        }

        return;
      }
      if(f.id==='create-user-form'){
        const data=await api.request('createUser',{agencyId:fd.agencyId,name:fd.name,lastName:fd.lastName,route:fd.route});
        openModal(`Hola ${esc(data.name)} 👋`,'Tu usuario fue creado con éxito.',`<p class="about-copy">Ingresa utilizando tu número de ruta y consulta tu contraseña con tu supervisor.</p><button class="btn btn-primary btn-block" data-action="close-modal">CERRAR</button>`);return;
      }
      if(f.id==='client-form'){
        const payload={clientId:fd.clientId,category:fd.category,business:fd.business,address:fd.address,reference:fd.reference}; const c=await api.request(fd.clientId?'updateClient':'createClient',payload);
        const idx=state.data.clients.findIndex(x=>x.ID_CLIENTE===c.ID_CLIENTE); if(idx>=0)state.data.clients[idx]=c;else state.data.clients.push(c); closeModal(); toast('Cliente guardado','success'); navigate(state.view,false);return;
      }
      if(f.id==='sale-form'){
        const client=(state.data?.clients||[]).find(x=>String(x.ID_CLIENTE)===String(fd.clientId));
        if(!client) throw new Error('Cliente no válido.');

        const item=enqueuePendingSale({
          saleId:fd.saleId,
          clientId:fd.clientId,
          amount:fd.amount
        },client);

        // Desde aquí el usuario ya no espera a Google Apps Script.
        // La venta quedó persistida en el teléfono antes de cerrar el modal.
        closeModal();

        // Iniciar el envío sin bloquear la interfaz.
        void syncPendingSales({notify:false});

        renderSales();
        toast('Venta guardada · sincronizando','success');
        return;
      }
      if(f.id==='edit-sale-form'){
        const res=await api.request('updateSale',{saleId:fd.saleId,amount:fd.amount}); state.data.dashboard=res.dashboard; closeModal();toast('Venta actualizada','success');await renderHistory();return;
      }
      if(f.id==='budget-form'){
        const data=await api.request('updatePeriod',{budgetCon:fd.budgetCon,budgetSin:fd.budgetSin,dates:[...state.budgetDates]});state.data=data;state.user=data.user;toast('Presupuesto actualizado','success');renderBudget();return;
      }
      if(f.id==='new-period-form'){
        const data=await api.request('startNewPeriod',{month:Number(fd.month),year:Number(fd.year),budgetCon:fd.budgetCon,budgetSin:fd.budgetSin,dates:[...state.newPeriodDates]});state.data=data;state.user=data.user;state.budgetDates=new Set((data.days||[]).filter(d=>d.DIA_PROGRAMADO==='SI').map(d=>String(d.FECHA).slice(0,10)));closeModal();toast('Nuevo período iniciado','success');navigate('inicio');return;
      }
    }catch(err){
      toast(err.message,'error');
    }finally{
      if(f.isConnected) restoreFormSubmit(f);
    }
  }

  let ncSavePromise=null;
  function setNcSummaryBusy(busy){
    const modal=$('.modal');
    if(!modal) return;
    const controls=[...modal.querySelectorAll('button,select')];
    controls.forEach(control=>{
      if(busy){
        control.dataset.ncWasDisabled=control.disabled?'1':'0';
        control.disabled=true;
      }else if(control.dataset.ncWasDisabled!==undefined){
        control.disabled=control.dataset.ncWasDisabled==='1';
        delete control.dataset.ncWasDisabled;
      }
    });
    const btn=$('#save-nc-btn');
    if(btn){
      if(busy){
        btn.dataset.originalText=btn.textContent;
        btn.textContent='GUARDANDO...';
        btn.setAttribute('aria-busy','true');
      }else{
        btn.textContent=btn.dataset.originalText|| (state.ncDraft.editId?'GUARDAR CAMBIOS':'GUARDAR NC');
        delete btn.dataset.originalText;
        btn.removeAttribute('aria-busy');
      }
    }
  }
  async function saveNCFromModal(){
    if(ncSavePromise) return ncSavePromise;
    const clientId=$('#nc-client')?.value;
    if(!clientId) return toast('Selecciona un cliente','error');
    const t=ncTotals();
    if(!t.items.length) return toast('Agrega al menos un producto','error');

    state.ncDraft.clientId=clientId;
    if(!state.ncDraft.editId&&!state.ncDraft.operationId) state.ncDraft.operationId=ncOperationId();
    const payload={
      ncId:state.ncDraft.editId||state.ncDraft.operationId,
      clientId,
      channel:state.ncDraft.channel,
      motiveId:state.ncDraft.motiveId,
      items:t.items.map(x=>({productId:x.ID_PRODUCTO,quantity:x.quantity}))
    };

    setNcSummaryBusy(true);
    ncSavePromise=(async()=>{
      try{
        const res=await api.request(state.ncDraft.editId?'updateNC':'saveNC',payload);
        if(res?.dashboard) state.data.dashboard=res.dashboard;
        state.ncDraft={channel:'',motiveId:'',items:{},catalog:[],editId:null,clientId:'',operationId:''};
        closeModal();
        toast(res?.duplicate?'Nota de crédito ya registrada':'Nota de crédito guardada','success');
        renderNC();
        return res;
      }catch(err){
        toast(err.message,'error');
        throw err;
      }finally{
        if($('#modal-root')?.children.length) setNcSummaryBusy(false);
      }
    })().finally(()=>{ncSavePromise=null;});

    try{return await ncSavePromise;}catch{return null;}
  }
  async function deactivateClient(id){
    try{await api.request('deactivateClient',{clientId:id});state.data.clients=state.data.clients.filter(c=>c.ID_CLIENTE!==id);closeModal();toast('Cliente desactivado','success');renderClientBase();}catch(err){toast(err.message,'error');}
  }
  async function historyView(kind,id){
    const x=(state.history||[]).find(i=>(kind==='VENTA'?i.ID_VENTA:i.ID_NC)===id);if(!x)return;
    if(kind==='VENTA'){
      openModal('Detalle de venta',esc(x.CLIENTE||''),`${infoTile('Fecha y hora',[dateLabel(x.FECHA),timeLabel(x.HORA)].filter(Boolean).join(' · '))}<div style="height:8px"></div>${infoTile('Categoría',x.CATEGORIA)}<div style="height:8px"></div>${infoTile('Monto',money(x.MONTO))}`);return;
    }
    try{
      const n=await api.request('getNCDetail',{ncId:id});
      const ncMeta=[dateLabel(n.FECHA||x.FECHA),timeLabel(n.HORA||x.HORA)].filter(Boolean).join(' · ');
      const detailItems=Array.isArray(n.items)?n.items:[];
      const totalUnits=detailItems.reduce((sum,i)=>sum+Number(i.CANTIDAD||0),0);
      const detailSubtotal=detailItems.reduce((sum,i)=>sum+Number(i.SUBTOTAL||0),0);
      const detailIncomplete=detailItems.length>0&&Math.abs(detailSubtotal-Number(n.SUBTOTAL||0))>=0.005;
      const productDetail=detailItems.length?`<div class="nc-detail-products">
        <div class="nc-detail-products-head"><strong>Productos</strong><span>${detailItems.length} ${detailItems.length===1?'producto':'productos'} · ${totalUnits} ${totalUnits===1?'unidad':'unidades'}</span></div>
        ${detailItems.map(i=>`<div class="nc-detail-product-row"><div><div class="nc-detail-product-name">${esc(i.PRODUCTO||'Producto')}</div><div class="nc-detail-product-meta">${money(i.PRECIO_UNITARIO)} × ${Number(i.CANTIDAD||0)}</div></div><strong>${money(i.SUBTOTAL)}</strong></div>`).join('')}
      </div>`:`<div class="nc-detail-empty">Este registro no tiene detalle de productos almacenado.</div>`;
      const detailWarning=detailIncomplete?`<div class="nc-detail-empty">El detalle histórico está incompleto: los productos almacenados suman ${money(detailSubtotal)}, pero la NC fue registrada con subtotal ${money(n.SUBTOTAL)}.</div>`:'';
      openModal('Detalle de NC',esc(x.CLIENTE||''),`${ncMeta?`<div class="history-detail-date">${esc(ncMeta)}</div>`:''}<div class="summary-line"><span>Canal</span><strong>${esc(n.CANAL)}</strong></div><div class="summary-line"><span>Motivo</span><strong>${esc(n.MOTIVO)}</strong></div>${productDetail}${detailWarning}<div class="summary-line"><span>Subtotal productos</span><strong>${money(n.SUBTOTAL)}</strong></div><div class="summary-line"><span>Aplicación</span><strong>${Math.round(Number(n.PORCENTAJE)*100)}%</strong></div><div class="summary-line summary-total"><span>Total NC</span><span>${money(n.TOTAL_NC)}</span></div>`);
    }catch(err){toast(err.message,'error');}
  }
  async function historyEdit(kind,id){
    const x=(state.history||[]).find(i=>(kind==='VENTA'?i.ID_VENTA:i.ID_NC)===id);if(!x)return;
    if(kind==='VENTA'){openModal('Editar venta',esc(x.CLIENTE||''),`<form id="edit-sale-form"><input type="hidden" name="saleId" value="${esc(id)}"><div class="field"><label>Monto</label><input name="amount" type="number" min="0.01" step="0.01" value="${Number(x.MONTO||0)}" required></div><div class="form-actions"><button type="button" class="btn btn-secondary" data-action="close-modal">CANCELAR</button><button class="btn btn-primary" type="submit">GUARDAR</button></div></form>`);return;}
    try{
      // Historial ya conoce el canal, así que detalle y catálogo pueden cargarse en paralelo.
      const channel=String(x.CANAL||'');
      const [n,catalog]=await Promise.all([
        api.request('getNCDetail',{ncId:id}),
        channel?getNcCatalogFast(channel):Promise.resolve([])
      ]);
      const finalCatalog=catalog.length?catalog:await getNcCatalogFast(n.CANAL);
      const motive=(state.data.motives||[]).find(m=>m.CANAL===n.CANAL&&m.MOTIVO===n.MOTIVO);
      const items=hydrateNcItems(n.items||[],finalCatalog);
      state.ncDraft={channel:n.CANAL,motiveId:motive?.ID_MOTIVO||'',items,catalog:finalCatalog,editId:n.ID_NC,clientId:n.ID_CLIENTE||'',operationId:''};
      closeModal();
      navigate('nc');
      const savedItems=Array.isArray(n.items)?n.items:[];
      const savedDetailSubtotal=savedItems.reduce((sum,item)=>sum+Number(item.SUBTOTAL||0),0);
      if(!savedItems.length){
        toast('Esta NC no tiene detalle de productos almacenado','error');
      }else if(Math.abs(savedDetailSubtotal-Number(n.SUBTOTAL||0))>=0.005){
        toast('El detalle histórico de esta NC está incompleto. Revisa los productos antes de guardar.','error');
      }
    }catch(err){toast(err.message,'error');}
  }
  async function historyDelete(kind,id){
    try{const res=await api.request(kind==='VENTA'?'cancelSale':'cancelNC',kind==='VENTA'?{saleId:id}:{ncId:id});state.data.dashboard=res.dashboard;closeModal();toast('Registro eliminado','success');await renderHistory();}catch(err){toast(err.message,'error');}
  }

  init();
})();
