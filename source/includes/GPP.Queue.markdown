<h2 id="gpp.queue" c_name="GPPQueue" python_name="GPP.Queue">GPP.Queue</h2>

<p class="graphviz">
<!-- Generated by graphviz version 2.38.0 (20140413.2041) --><!-- Title: %3 Pages: 1 --><svg width="110pt" height="116pt" viewBox="0.00 0.00 110.00 116.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(4 112)"><title>%3</title><polygon fill="white" stroke="none" points="-4,4 -4,-112 106,-112 106,4 -4,4"/><!-- GObject.Object --><g id="node1" class="node"><title>GObject.Object</title><g id="a_node1"><a xlink:href="https://developer.gnome.org/gobject/unstable//gobject-The-Base-Object-Type.html#GObject" xlink:title="GObject.Object"><path fill="none" stroke="black" d="M90,-108C90,-108 12,-108 12,-108 6,-108 0,-102 0,-96 0,-96 0,-84 0,-84 0,-78 6,-72 12,-72 12,-72 90,-72 90,-72 96,-72 102,-78 102,-84 102,-84 102,-96 102,-96 102,-102 96,-108 90,-108"/><text text-anchor="middle" x="51" y="-86.3" font-family="Times,serif" font-size="14.00">GObject.Object</text></a></g></g><!-- GPP.Queue --><g id="node2" class="node"><title>GPP.Queue</title><g id="a_node2"><a xlink:href="#gpp.queue" xlink:title="GPP.Queue"><path fill="none" stroke="black" d="M79,-36C79,-36 23,-36 23,-36 17,-36 11,-30 11,-24 11,-24 11,-12 11,-12 11,-6 17,-0 23,-0 23,-0 79,-0 79,-0 85,-0 91,-6 91,-12 91,-12 91,-24 91,-24 91,-30 85,-36 79,-36"/><text text-anchor="middle" x="51" y="-14.3" font-family="Times,serif" font-size="14.00">GPP.Queue</text></a></g></g><!-- GObject.Object&#45;&gt;GPP.Queue --><g id="edge1" class="edge"><title>GObject.Object&#45;&gt;GPP.Queue</title><path fill="none" stroke="black" d="M51,-71.6966C51,-63.9827 51,-54.7125 51,-46.1124"/><polygon fill="black" stroke="black" points="54.5001,-46.1043 51,-36.1043 47.5001,-46.1044 54.5001,-46.1043"/></g></g></svg></p>

  [GPP.Queue](#gpp.queue) routes requests from [GPP.Client](#gpp.client) (s) to [GPP.Worker](#gpp.worker) (s).

> Set up and start a queue

```c
#include <glib-unix.h>

#include "gpp.h"

static gboolean
interrupted_cb (GMainLoop *loop)
{
  g_main_loop_quit (loop);
  return FALSE;
}

int main (void)
{
  GPPQueue *self = gpp_queue_new ();
  GMainLoop *loop = g_main_loop_new (NULL, FALSE);

  g_unix_signal_add_full (G_PRIORITY_DEFAULT, SIGINT, (GSourceFunc) interrupted_cb, loop, NULL);
  gpp_queue_start (self);
  g_main_loop_run (loop);

  return 0;
}

```

It will detect if a worker stopped answering heartbeats, and
inform the client it was working for if there was one.

It will pick workers on a least-recently-used basis.

  <h3 id='FtPglg' class='subsection'><u>Methods:</u></h3>

<div class='prototype_start'></div>

<h3 id="gpp.queue.new" c_name="gpp_queue_new">GPP.Queue.new</h3>

```c
GPPQueue* gpp_queue_new (void);

```

*Returns*: the newly-created [GPP.Queue](#gpp.queue).

<div class='prototype_end'></div>

Create a new [GPP.Queue](#gpp.queue), which doesn't yet listen to [GPP.Worker](#gpp.worker) (s).
Start it with [GPP.Queue.start](#gpp.queue.start)

<div class='prototype_start'></div>

<h3 id="gpp.queue.start" c_name="gpp_queue_start" python_name="GPP.Queue.start">GPP.Queue.start</h3>

```c
gboolean gpp_queue_start (GPPQueue* self);

```

```python
@accepts(GPP.Queue)
@returns(bool)
def start(self):
    # Python wrapper for gpp_queue_start()

```
*self*: A [GPP.Queue](#gpp.queue) to start.

*Returns*: **TRUE** if the queue was started, **FALSE** if it was already.

<div class='prototype_end'></div>

Makes **self** start to route requests to available workers,
and check worker's liveness.

