<div>
  car id: {{_this.id}}
</div>

<div>
  car name: {{_this.name}}
</div>

<div>
  car price: {{_this.price}}
</div>

<c-module path="pages/road/list"></c-module>

<div id="b">pages/road/detail{{JSON.stringify(_this)}}</div>
<c-module path="pages/road/detail"></c-module>