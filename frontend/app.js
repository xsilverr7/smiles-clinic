// Cuando publiques el backend en Render, cambia esta URL:
const API = "https://smiles-clinic.onrender.com/api";
let pacientes=[], dentistas=[], citas=[];
function show(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');cargarTodo();}
async function request(url, opts={}){const r=await fetch(API+url,{headers:{'Content-Type':'application/json'},...opts}); if(!r.ok) throw new Error(await r.text()); return r.json();}
function data(form){return Object.fromEntries(new FormData(form).entries());}
function item(html){return `<div class="item">${html}</div>`;}
async function cargarTodo(){try{pacientes=await request('/pacientes');dentistas=await request('/dentistas');citas=await request('/citas');renderPacientes();renderDentistas();renderCitas();llenarSelects();renderResumen();}catch(e){console.log(e);}}
async function renderResumen(){try{const r=await request('/admin/resumen');document.getElementById('resumen').innerHTML=`<div class="card"><h3>${r.pacientes}</h3><p>Total de pacientes</p></div><div class="card"><h3>${r.dentistas}</h3><p>Total de dentistas</p></div><div class="card"><h3>${r.citasProgramadas}</h3><p>Citas programadas</p></div><div class="card"><h3>${r.citasCanceladas}</h3><p>Citas canceladas</p></div>`;}catch(e){}}
function renderPacientes(){document.getElementById('listaPacientes').innerHTML=pacientes.map(p=>item(`<b>${p.nombreCompleto}</b><p>${p.edad} años | ${p.telefono} | ${p.correo}</p><p class="muted">${p.direccion}</p><div class="actions"><button onclick='editarPaciente(${JSON.stringify(p)})'>Editar</button><button class="danger" onclick="eliminar('/pacientes/${p._id}')">Eliminar</button></div>`)).join('');}
function renderDentistas(){document.getElementById('listaDentistas').innerHTML=dentistas.map(d=>item(`<b>${d.nombre}</b><p>${d.especialidad} | ${d.telefono} | ${d.correo}</p><p class="muted">Horario: ${d.horarioAtencion}</p><div class="actions"><button onclick='editarDentista(${JSON.stringify(d)})'>Editar</button><button class="danger" onclick="eliminar('/dentistas/${d._id}')">Eliminar</button></div>`)).join('');}
function renderCitas(){document.getElementById('listaCitas').innerHTML=citas.map(c=>item(`<b>${c.fecha} ${c.hora}</b><p>Paciente: ${c.paciente?.nombreCompleto||'N/A'} | Dentista: ${c.dentista?.nombre||'N/A'}</p><p>${c.motivo} - <b>${c.estado}</b></p><div class="actions"><button onclick='editarCita(${JSON.stringify(c)})'>Reprogramar/Editar</button><button onclick="estado('${c._id}','Confirmada')">Confirmar</button><button onclick="estado('${c._id}','Atendida')">Atendida</button><button class="danger" onclick="eliminar('/citas/${c._id}')">Cancelar</button></div>`)).join('');}
function llenarSelects(){selPaciente.innerHTML=pacientes.map(p=>`<option value="${p._id}">${p.nombreCompleto}</option>`).join('');selDentista.innerHTML=dentistas.map(d=>`<option value="${d._id}">${d.nombre} - ${d.especialidad}</option>`).join('');}
formPaciente.onsubmit=async e=>{e.preventDefault();let o=data(formPaciente), id=formPaciente.dataset.id; await request('/pacientes'+(id?'/'+id:''),{method:id?'PUT':'POST',body:JSON.stringify(o)});formPaciente.reset();delete formPaciente.dataset.id;cargarTodo();};
formDentista.onsubmit=async e=>{e.preventDefault();let o=data(formDentista), id=formDentista.dataset.id; await request('/dentistas'+(id?'/'+id:''),{method:id?'PUT':'POST',body:JSON.stringify(o)});formDentista.reset();delete formDentista.dataset.id;cargarTodo();};
formCita.onsubmit=async e=>{e.preventDefault();let o=data(formCita), id=formCita.dataset.id; await request('/citas'+(id?'/'+id:''),{method:id?'PUT':'POST',body:JSON.stringify(o)});formCita.reset();delete formCita.dataset.id;cargarTodo();};
function editarPaciente(p){Object.keys(p).forEach(k=>formPaciente[k]&&(formPaciente[k].value=p[k]));formPaciente.dataset.id=p._id;show('pacientes');}
function editarDentista(d){Object.keys(d).forEach(k=>formDentista[k]&&(formDentista[k].value=d[k]));formDentista.dataset.id=d._id;show('dentistas');}
function editarCita(c){formCita.paciente.value=c.paciente?._id;formCita.dentista.value=c.dentista?._id;formCita.fecha.value=c.fecha;formCita.hora.value=c.hora;formCita.motivo.value=c.motivo;formCita.estado.value=c.estado;formCita.dataset.id=c._id;show('citas');}
async function eliminar(url){if(confirm('¿Confirmar acción?')){await request(url,{method:'DELETE'});cargarTodo();}}
async function estado(id,estado){await request('/citas/'+id+'/estado',{method:'PATCH',body:JSON.stringify({estado})});cargarTodo();}
function renderResultados(arr){resultados.innerHTML=Array.isArray(arr)? arr.map(x=>item(`<pre>${JSON.stringify(x,null,2)}</pre>`)).join('') : item(`<pre>${JSON.stringify(arr,null,2)}</pre>`);}
async function citasDia(){renderResultados(await request('/citas/dia/'+fechaConsulta.value));}
async function pacientesRecientes(){renderResultados(await request('/pacientes/recientes'));}
async function citasCanceladas(){renderResultados(await request('/citas/canceladas'));}
async function citasPorDentista(){renderResultados(await request('/citas/por-dentista'));}
async function citasPorEspecialidad(){renderResultados(await request('/citas/por-especialidad/'+especialidadConsulta.value));}
cargarTodo();
