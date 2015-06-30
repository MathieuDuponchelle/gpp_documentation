<h1 id="introduction">Introduction</h1>

Welcome to the GObject Paranoid Pirate (GPP) documentation.

GPP is a simple GObject implementation of the [Paranoid Pirate Pattern](http://rfc.zeromq.org/spec:6),
which uses zeromq internally.

GPP is *not* a zeromq GLib wrapper.

It provides a [GPP.Queue](#gpp.queue) object, which relays requests from a [GPP.Client](#gpp.client) to a [GPP.Worker](#gpp.worker), and replies
from the worker to the client, as simple strings.

It implements heartbeating, which means that if a worker fails in some way, the client will be able
to make its request again, with a per-request retries limit.

Workers are picked on a least-recently-used basis.

One can indifferently instantiate and use all these objects in the same process or in separate ones.

It doesn't implement client prioritization, this is up to the user.

This documentation is intended as a quick guide and API reference.

